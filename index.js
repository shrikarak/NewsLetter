const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://shrikara:shri1234@cluster0.vxnu2.mongodb.net/sample?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.static("remote"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

  firstname = req.body.firstName;
  lastname = req.body.lastName;
  email = req.body.inputEmail;

  const member = { members: [{
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstname,
      LNAME: lastname
    }
  }]
};
  
client.connect(err => {
  const collection = client.db("sample").collection("sample");
  res.write(collection.find({}));
  // perform actions on the collection object
  client.close();
});

res.send();
  /*const memberJson = JSON.stringify(member);
  const url = "https://us20.api.mailchimp.com/3.0/lists/a68152976b";
  const options = {
    method: "POST",
    auth: "shrikara:40f4ed7aaebfb63aa4b1d240b094b782-us20"
  };
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");}
    else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(memberJson);
  request.end();*/
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started!!");
})