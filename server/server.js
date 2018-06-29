const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const app = express()
const port = process.env.PORT || 4000

var db

MongoClient.connect(url, function(err, database){
  if(err) throw err;  
  db = database
  app.listen(port, () => {
    console.log(`${port} is listening...`);
  })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/NewRoute/', (req, res, next) => {
  console.log(req.body.route)
  console.log(req.body.stations)
  console.log(req.body.rules)
  let dbo = db.db("project")
  dbo.collection("route").insert(req.body.route, (err, res) => {
    if(err) throw err
    console.log("route are inserted")
  })
  dbo.collection("stations").insert(req.body.stations, (err, res) => {
    if (err) throw err
    console.log("stations are inserted")
  })
  dbo.collection("rules").insert(req.body.rules, (err, res) =>{
    if (err) throw err
    console.log("rules are inserted")
  })
})

