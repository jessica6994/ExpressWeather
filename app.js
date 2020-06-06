var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index");
})

app.get("/weather", function(req, res){
    var city = req.query.city;
    if(city === null){
        res.render("page-not-found");
    }
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=be5139ae390569e0c02cddf0368a056f";
    request(url, function(error, response, body){
        if (error) {
            console.log(error);
        }
        if (response.statusCode == 404) {
            console.log("City not found");
            res.render("page-not-found");
        }
        if(!error && response.statusCode == 200){
            var weatherResult = JSON.parse(body);
            res.render("weather", {weather: weatherResult, city: city});
        }
    })
})

app.get("*", function(req, res){
    res.render("page-not-found");
})

app.listen(3000, function(){
    console.log("server started app running");
})