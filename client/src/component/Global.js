// 最大的那塊 設定與 navbar 與 sidebar 的距離
const fontSize = 16;
const sidebarWidthREM = 18;
const paddingLeft = fontSize * sidebarWidthREM;
const rowMargin = 30;
export const containerStyle = {
  paddingLeft: paddingLeft + rowMargin + "px",
  paddingRight: "30px",
  paddingTop: "56px",
}
// ------------------------------------------

export const ModalListStyle = {
  listStyleType: "none",
  border: "none",
  overflowY: "scroll",
  overflowX: "hidden",
  height: "300px",
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

export const badgeStyle = {
  boxShadow: "none",
  backgroundColor: "#e8e8e8"
}

export const colors = {
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
}

export const stationInfos = {
  spot: [
    {
      spotId: 0,
      name: {
        ch: "凱薩大飯店",
        en: "KDM Hotel",
      },
      icon: "hotel"
    },
    {
      spotId: 1,
      name: {
        ch: "三維人股份有限公司",
        en: "3drens"
      },
      icon: "building"
    },
    {
      spotId: 2,
      name: {
        ch: "台北自來水園區",
        en: "Taipei Water Park"
      },
      icon: "parking"
    }
  ]
}