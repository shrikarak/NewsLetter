const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
//const mongodb = require('mongodb');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
/*
main().catch(err => console.log(err));

async function main() {
await mongoose.connect("mongodb://shrikara:shri1234@cluster0.vxnu2.mongodb.net/sample?retryWrites=true&w=majority");
}*/
//const uri = "mongodb://shrikara:shri1234@cluster0.vxnu2.mongodb.net/sample?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
/*
const kittySchema = new mongoose.Schema({
  name: String
});*/
/*
const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); 

const fluffy = new Kitten({ name: 'fluffy' });
saveCat().catch(err => console.log(err));

async function saveCat() {
await fluffy.save();
}
*/

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
  //Kitten.find(function(err,kittens){
//res.write(kittens);
//});
  
const uri = "mongodb+srv://shrikara:shri1234@cluster0.vxnu2.mongodb.net/sample?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("connected to mongoDB");
  client.close();
});
  res.send();
// client.connect(err => {
  // const collection = client.db("sample").collection("sample");
  // res.write(collection.find({}));
  // perform actions on the collection object
  // client.close();
// });


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
