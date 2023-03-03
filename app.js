// const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();



app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = process.env.WEATHER_API_KEY;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +
     "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        // console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
            console.log(description);
            res.write("<h1>The temperature in " + query + " is " + temp + 
            " degrees celsius</h1>");
            res.write("<p> The weather is currently " + description + "</p>");
            res.write("<img src=" + imageURL + ">")
            res.send();
        })
    })
})



// app.get("/",function(req,res){
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=d467d342c693cb51f926c44e3ddfea78&units=metric"
//     https.get(url,function(response){
//         response.on("data",function(data){
//             const weatherData = JSON.parse(data)
//             const temp = weatherData.main.temp
//             const desc = weatherData.weather[0].description
//             const icon = weatherData.weather[0].icon
//             const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
//             res.write("<h1>The temperature in delhi is "+temp+" degrees celsius</h1>")
//             res.write("<p>the weather is currently "+desc+"</p>")
//             res.write("<img src="+imageURL+">")
//             res.send()
//         })
//     })
// })

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})