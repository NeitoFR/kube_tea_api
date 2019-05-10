const express = require("express"),
  app = express(),
  _ = require("lodash"),
  teaApi = require("./teaRoute"),
  mongoHelper = require("./mongoHelper");

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Content-Type','application/json');
  console.log("Headers added to the request");
  next()
})
app.use(teaApi)

app.get("hello", (req, res) => {
  res.send("Hello from Tea API").end();
})

mongoHelper._initMongoDBConnection(() => {
  app.listen(3030, () => {
    console.log("Server listening on port ", 3030);
  });
});
