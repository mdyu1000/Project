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

export const iconList = [
  { name: `地標 (default)`, icon: `map-marker` },
  { name: `商場`, icon: `shopping-cart` },
  { name: `店家`, icon: `store` },
  { name: `學校`, icon: `school` },
  { name: `大學`, icon: `university` },
  { name: `餐廳`, icon: `utensils` },
  { name: `服飾`, icon: `tshirt` },
  { name: `森林`, icon: `tree` },
  { name: `劇院`, icon: `theater-masks` },
  { name: `桌遊`, icon: `chess` },
  { name: `咖啡廳`, icon: `coffee` },
  { name: `醫院`, icon: `hospital` },
  { name: `建築`, icon: `building` },
  { name: `旅店`, icon: `hotel` },
  { name: `銀行`, icon: `dollar-sign` },
  { name: `機場`, icon: `plane-departure` },
  { name: `酒館`, icon: `wine-glass` },
  { name: `館院廳`, icon: `landmark` },
  { name: `廟宇`, icon: `vihara` },
  { name: `港口`, icon: `ship` },
  { name: `火車`, icon: `train` },
  { name: `地鐵`, icon: `subway` },
  { name: `客運`, icon: `bus-alt` },
  { name: `計程車`, icon: `taxi` },
  { name: `台北捷運`, icon: `mrt`, custom: true, url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/The_seal_of_Department_of_Rapid_Transit_Systems%2C_Taipei_City_Government_20140108.svg" },
]

/* marquee */
const joke_1 =   
  "有一次去女同學家" +
  "推開門竟發現她在沙發上用震動棒......" +
  "我兩相視了五秒突然震動棒沒了動靜" + 
  "她嬌羞的說：那個...沒電了...你能...過來幫我嗎？" + 
  "我吞了一口硾液 激動著點點頭~" + 
  "連忙跑到樓下超市給她買了一對金頂電池" + 
  "從那以後她再也沒理我 至今我都不明白到底我做錯什麼" + 
  "現在偶爾見面 她還是不理我 我也不好意思跟她提那電池28塊錢的事" +
  "我估計她是不還錢所以才故意不理我..." +
  "真沒想到她是這樣的人~"

const joke_2 =
  "想起國中會考那年，我剛進考場" +
  "才發現准考證忘記帶，正當我焦急的時候" +
  "看到我爸氣喘吁吁的跑來" +
  "爸：「你的准考證放在家裡了！」" +
  "我感動的說：「謝謝，急死我了，快給我吧，要考試了！」" +
  "這時我爸愣了一下" +
  "「我不是說放在家裡了嗎？」"

const joke_3 = 
"剛剛看到金城武，我們相視了許久，誰也沒打破這個僵局，直到我手酸" +
"，把鏡子放下"

const joke_4 =
"昨天我去銀行辦事，直接走到櫃台號碼機旁邊站著，服務人員走過來跟我說：「先生，按號」"+
"我在想暗號到底是什麼，就隨便跟他說：「芝麻開門」，他聽了我講的暗號後很無奈的幫我按出一張號碼牌"+
"暗號居然被我瞎猜對了."

const joke_5 = 
"我出了車禍，護士告訴我：你摸摸腿，還有沒有感覺？"+
"我摸了摸腿：唉！還是蠻有感覺的嘛！"+
"護士大喊：摸你自己的腿啦！"

const joke_6 = "我們校長超靠北，今天在致詞時說：「去年的全校大掃除是由全體高一同學負責的，為了公平起見，今年就換高二的同學負責吧"
const joke_7 = "剛剛去加油站加油，我跟工讀生說９２加１００，結果他回我等於１９２，哇幹，他應該沒被油槍打過吧"
const joke_8 = "昨天我朋友很興奮的跑來找我說他不是處男了，我要他別著急坐下來慢慢說，結果他說他沒辦法坐下"
export const marquee = [
  joke_1, joke_2, joke_3, joke_4, joke_5, joke_6, joke_7, joke_8
]