export const ModalListStyle = {
  listStyleType: "none",
  border: "none",
  overflowY: "scroll",
  overflowX: "hidden",
  height: "380px",
}

export const ModalItemStyle = {
  borderRadius: "5px",
  border: "1px solid #1e1e1e",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.75rem 1.25rem",
  backgroundColor: "rgba(255,255,255,0.2)",
  zIndex: "10000",
  cursor: "move",
}

export const colors = {
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
}

export const stations = [
  {
    "name": {
      ch: "忠孝復興",
      en: "Zhongxiao Fuxing"
    },
    "center": {
      "lat": 25.041951, 
      "lng": 121.543073  
    }
  },
  {
    "name": {
      ch: "南京復興",
      en: "Nanjing Fuxing"
    },
    "center": {
      "lat": 25.052241,
      "lng": 121.54404049999994    
    }    
  },
  {
    "name": {
      ch: "中山國中",
      en: "Zhongshan Junior High School"
    },
    "center": {
      "lat": 25.061032, 
      "lng": 121.544497      
    }    
  },
  {
    "name": {
      ch: "松山機場",
      en: "Songshan Airport"
    },
    "center": {
      "lat": 25.063130,
      "lng": 121.551962
    }
  },
]