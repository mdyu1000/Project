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
  let dbo = db.db("project")
  dbo.collection("route").insert(req.body.route, (err, res) => {
    if(err) throw err
    console.log("route are inserted")
  })
})

app.get('/AllRoute/', (req, res, next) => {
  console.log("Get is called")
  let dbo = db.db("project")
  dbo.collection("route").find().toArray((err, results) => {
    if(err) throw err
    res.send(JSON.stringify(results));
  })  
})

