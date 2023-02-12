const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");

require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post('/', function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url =process.env.url_api;

    const options = {
        method: "POST",
        auth: process.env.auth_api
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname+"/Success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect('/');
});



app.listen(process.env.PORT || 3000, function(){
    console.log("App is running on port 3000.");
})




//API Key 37c3b8e4514970fa66f9385599b735ae-us21

//Audience id b107620424
