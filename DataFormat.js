const route = [
  {  
    RID: 1,
    route_name: { 
      ch: "xxx",
      en: "xxx",
      kr: "xxx",
      jp: "xxx",
    },
    departure_name: { 
      ch: "xxx",
      en: "xxx" 
    },
    destinationLists: { 
      ch: "xxx",
      en: "xxx"
    },
    theme_color: "#AABBCC",
    stations: [1, 2, 3], //此處為SID
    rules: [1, 5, 9],    //此處為RID
  }
]

const stations = [
  {
    SID: 1,
    name: {
      ch: "忠孝復興",
      en: "Zhongxiao Fuxing"
    },
    location: {
      "lat": 25.041951, 
      "lng": 121.543073  
    }
  },
  {
    SID: 2,
    name: {
      ch: "南京復興",
      en: "Nanjing Fuxing"
    },
    location: {
      "lat": 25.052241,
      "lng": 121.54404049999994    
    }    
  },
  {
    SID: 3,
    name: {
      ch: "中山國中",
      en: "Zhongshan Junior High School"
    },
    location: {
      "lat": 25.061032, 
      "lng": 121.544497      
    }    
  },
  {
    SID: 4,
    name: {
      ch: "松山機場",
      en: "Songshan Airport"
    },
    location: {
      "lat": 25.063130,
      "lng": 121.551962
    }
  },
]

const rules = [
  {
    RID: 1,
    condition: 1,
    SID: 3,
    distance: 223
  },
  {          //Rule 2 距離
    RID: 2,    
    condition: 2,
    SID: 1,
    type: 0,
    value: 123
  },
  {
    RID: 3,
    condition: 3,
    distance: 500
  },
  {
    RID: 4,    
    condition: 4,
    interval: 20
  },
  {          //Rule 2 時間
    RID: 5,    
    condition: 2,
    SID: 4,
    type: 1,
    value: 1243
  }
]