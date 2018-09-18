const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const request = require('request')
const url = "mongodb://xqxqxq:yee666@ds255347.mlab.com:55347/kkk777"

const GOOGLE_API_KEY="key=AIzaSyDzkV6yiLEXZ_cvst1kBhflXFbATfi8jEY"

const HERE_API = {
  id: "app_id=ZTcud6py5cGnODgrHuoK",
  code: "app_code=AyFMJoG9Icohe9G6f4Scyg",
  url: "https://weather.api.here.com/weather/1.0/report.json?",
  product: "product=observation"
}

const GOOGLE_GEOCODE_API = {
  url: "https://maps.googleapis.com/maps/api/geocode/json?",
  language: "language=en"
}

const app = express()
const port = process.env.PORT || 4000

const TAIPEI_BUS = require('./TaipeiBus')
const NEWTAIPEI_BUS = require('./NewTaipeiBus')
const utils = require('./utils')

var db
var dbo

MongoClient.connect(url, { useNewUrlParser: true }, function(err, database){
  if(err) throw err;
  db = database
  dbo = db.db("kkk777")
  console.log("Connect mLab successful")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/NewRoute/', (req, res, next) => {

  let route = utils.setDistanceAndExtremum(req.body.route)
  let simulator = utils.setSimulatorForDemo(req.body.route)

  dbo.collection("route").insert(route, (err, res) => {
    if(err) throw err
  })

  dbo.collection("simulator").insert(simulator, (err, res) => {
    if(err) throw err
  })
})

app.get('/AllRoute/', (req, res, next) => {
  
  dbo.collection("route").find().toArray((err, results) => {
    if(err) throw err

    let sort = results.sort((a, b) => a.RID > b.RID ? 1 : -1)
    res.send(JSON.stringify(sort));
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
  dbo.collection("busOpenData").find().toArray((err, results) => {
    if(err) throw err
    res.send(JSON.stringify(results));
  })
})

app.put('/UpdateRoute/:RID', (req, res, next) => {
  let RouteID = parseInt(req.params.RID)
  let query = { RID: RouteID }
  let route = utils.setDistanceAndExtremum(req.body.route)
  let simulator = utils.setSimulatorForDemo(req.body.route)

  let newValue = { $set: {
    routeName: route.routeName,
    departureName: route.departureName,
    destinationName: route.destinationName,
    themeColor: route.themeColor,
    stations: route.stations,
    rules: route.rules,
    marquee: route.marquee,
    distanceMax: route.distanceMax,
    distanceMin: route.distanceMin
  }}

  let newSimulator = { $set: {
    RID: RouteID,
    stations: simulator.stations,
    length: simulator.length
  }}

  dbo.collection("route").updateOne(query, newValue, (err, result) => {
    if (err) throw err;
    // res.send("Update collection route successful")
  })

  dbo.collection("simulator").findOneAndUpdate(query, newSimulator, {
    upsert: true
  }, (err, result) => {
    if (err) throw err;
    // res.send("Update collection simulator successful")
  })
})

/* 前端 Route Table 需要的資料 */
app.get('/AllRouteXQ/', (req, res, next) => {
  let routes = []

  dbo.collection("route").find().toArray((err, results) => {
    if(err) throw err

    results.map(result => {
      routes.push({
        id: result._id,
        name: result.routeName,
        departure: result.departureName,
        destination: result.destinationName,
        color: result.themeColor,
      })
    })

    res.send(routes)
  }) 
})

/* 前端 播放路線 需要的資料 */
app.get('/OneRouteXQ/:RID', (req, res, next) => {

  let query = {
    "_id": ObjectId(req.params.RID)
  }
  
  dbo.collection("route").find(query).toArray((err, result) => {
    if(err) throw err
    res.send(JSON.stringify(result[0]))
  })
})


function setBusFileToDB(result){
  for(var i = 0; i < result.length; i++) {

    let query = {
      openDataRID: result[i].openDataRID
    }

    let set = {
      $set: result[i]
    }

    dbo.collection("busOpenData").findOneAndUpdate(query, set, {
      upsert: true
    }, (err, doc) => {
      if (err) console.log(err)
    })
  }
}

/*
  先將經緯度透過 Google Map API Geocoding 解碼
  透過 type administrative_area_level_1 或 administrative_area_level_2 判斷為直轄市或一般縣市
  切割字串後取得縣市名稱 再送入 Here Map Weather API 取得天氣
*/
app.get('/weather/:lng&:lat', (req, res, next) => {
  const geocodeURL = `${GOOGLE_GEOCODE_API.url}&latlng=${req.params.lng},${req.params.lat}&${GOOGLE_GEOCODE_API.language}&${GOOGLE_API_KEY}`
  let data = {
    success: false,
    data: {}
  }
  let location = ""

  request(geocodeURL, (err, response, body) => {
    let geocodeRes = JSON.parse(body)

    if(geocodeRes.status != "OK"){
      res.send(data)
    }else{

      for(var i = 0; i < geocodeRes.results[0].address_components.length; i++){
        let item = geocodeRes.results[0].address_components[i]

        /* 確認是直轄市 又有 city 可以切割 */
        if(item.types.includes("administrative_area_level_1") && item.long_name.indexOf("City") != -1){
          location = item.long_name.split(" City")[0]
          break
        }
        /* 確認只是一般縣市 又有 county 可以切割 */
        else if(item.types.includes("administrative_area_level_2") && item.long_name.indexOf("County") != -1){
          location = item.long_name.split(" County")[0]
          break
        }
      }

      /* 若 location 沒有撈到縣市 */
      if(location == ""){
        res.send({
          success: false,
          data: {
            info: "location is empty"
          }
        })
      }else{
        const HERE_WEATHER_API_URL = `${HERE_API.url}&${HERE_API.id}&${HERE_API.code}&${HERE_API.product}&name=${location}`
        request(HERE_WEATHER_API_URL, (err, response, body) => {
          
          let result = JSON.parse(body)

          if(result.Type == "Invalid Request"){
            res.send(data)
          }else{
            data = {
              success: true,
              data: {
                country: result.observations.location[0].observation[0].country,
                city: result.observations.location[0].observation[0].city,
                temperature: result.observations.location[0].observation[0].temperature,
                description: result.observations.location[0].observation[0].description,
                iconName: result.observations.location[0].observation[0].iconName,
                iconLink: result.observations.location[0].observation[0].iconLink,
              }
            }
            res.send(data)
          }
        })       
      }
    }
  })
})

app.get("/simulator/:RID", (req, res, next) => {
  let query = {
    "RID": Number(req.params.RID)
  }

  let data = {
    success: false,
    data: []
  }

  dbo.collection("simulator").find(query).toArray((err, result) => {
    if(err) {
      res.send(data)
    }else{
      if(result == ''){
        res.send(data)
      }else{
        data.success = true
        data.data = result
        res.send(data)
      }
    }
  })
})

function storeBusFromOpenData() {
  TAIPEI_BUS.getTaipeiBusFromOpenData(result => {
    setBusFileToDB(result)
  })

  NEWTAIPEI_BUS.getNewTaipeiBusFromOpenData(result => {
    setBusFileToDB(result)
  })
}

// setTimeout(() => {
//   storeBusFromOpenData()
// },3000)

app.listen(port, () => {
  console.log(`${port} is listening...`);
})
