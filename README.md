# Project

## Clone

```
cd Project
yarn install    // 安裝 server 端套件
cd client
yarn install    // 安裝 client 端套件
cd ..
yarn dev        // run 前端
```

## 測試
若要從 local 端測試，而不經過 heroku 了話，要將 client / constans.js 裡面的 SERVER 常數改為
```
// export const SERVER = "https://busplay-server.herokuapp.com"
export const SERVER = ""
```
然後 前後端都要 run 起來才可以 不然前端抓不到資料會是 empty
```
yarn server
node server.js    // run 後端
```