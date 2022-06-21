const express = require("express");
const https = require("https");
const app = express();
const bodyParse = require("body-parser")

app.use(bodyParse.urlencoded({extended: true}))

app.get("/" , (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})


app.post("/" , (req , res)=>{
    
        var cityName = req.body.cityName;   

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=9e8d13745f84898370f7b891237b7465&units=metric";  
    
    
        https.get(url , (response)=>{
            response.on("data" , (data)=>{
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imgurl = " http://openweathermap.org/img/wn/"+  icon +"@2x.png"

                res.write("<body style=margin:0;padding:0>")
                res.write("<div style=width:100%;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://cdn.pixabay.com/photo/2016/12/14/04/08/thunderbolt-1905603_960_720.png');background-repeat:no-repeat;background-size:cover>")
                res.write("<h1 style=color:white;font-family:Verdana,Geneva,Tahoma,sans-serif;>The temp in "+ cityName +" is: " + temp + " Degree Celsius</h1>" )
                res.write("<h2 style=color:white;font-family:Verdana,Geneva,Tahoma,sans-serif;>The weather is currently: " + description + " </h2>" )
                res.write("<img src = "+ imgurl +" style=width:200px;height:200px>");
                res.write("</div>")
                res.write("</body>")
            })
        })
    })



app.listen(3000, function () {
    console.log("Server started at port 3000");
})