const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://xqxqxq:yee666@ds255347.mlab.com:55347/kkk777";

const app = express()
const port = process.env.PORT || 4000

const TAIPEI_BUS = require('./TaipeiBus')
const NEWTAIPEI_BUS = require('./NewTaipeiBus')

var db
var dbo

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database){
  if(err) throw err;
  db = database
  dbo = db.db("kkk777")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/NewRoute/', (req, res, next) => {
  dbo.collection("route").insert(req.body.route, (err, res) => {
    if(err) throw err
  })
})

app.get('/AllRoute/', (req, res, next) => {
  dbo.collection("route").find().toArray((err, results) => {
    if(err) throw err
    res.send(JSON.stringify(results));
  })
})

app.get('/AllRoute/:RID', (req, res, next) => {
  let RouteID = parseInt(req.params.RID)  // 原參數為 string 型態 必須轉換為 int 才可使用
  let query = { RID: RouteID}
  dbo.collection("route").find(query).toArray((err, result) => {
    if(err) throw err
    res.send(JSON.stringify(result))
  })
})

app.get('/BusInfo/', (req, res, next) => {
  dbo.collection("TaipeiBus").find().toArray((err, results) => {
    if(err) throw err
    res.send(JSON.stringify(results));
  })
})

app.put('/UpdateRoute/:RID', (req, res, next) => {
  let RouteID = parseInt(req.params.RID)
  let query = { RID: RouteID }
  let newValue = { $set: {
    routeName: req.body.route.routeName,
    departureName: req.body.route.departureName,
    destinationName: req.body.route.destinationName,
    themeColor: req.body.route.themeColor,
    stations: req.body.route.stations,
    rules: req.body.route.rules
  }}
  dbo.collection("route").updateOne(query, newValue, (err, result) => {
    if (err) throw err;
    res.send("update successful")
  })
})

function storeTaipeiBusFromOpenData() {
  TAIPEI_BUS.getTaipeiBusFromOpenData(result => {
    dbo.collection("TaipeiBus").remove({}, err => {
      dbo.collection("TaipeiBus").insert(result, err2 => {
        console.log("Taipei bus information insert successful")
      })
    })
  })
}

function storeNewTaipeiBusFromOpenData() {
  NEWTAIPEI_BUS.getNewTaipeiBusFromOpenData(result => {
    dbo.collection("NewTaipeiBus").remove({}, err => {
      dbo.collection("NewTaipeiBus").insert(result, err2 => {
        console.log("NewTaipei bus information insert successful")
      })
    })
  })
}

setTimeout(()=>{
  storeTaipeiBusFromOpenData()
},3000)

setTimeout(()=>{
  storeNewTaipeiBusFromOpenData()
},3000)

app.listen(port, () => {
  console.log(`${port} is listening...`);
})
