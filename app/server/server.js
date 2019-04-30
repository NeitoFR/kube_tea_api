const express = require("express"),
  app = express(),
  _ = require("lodash"),
  teaApi = require("./teaRoute"),
  mongoHelper = require("./mongoHelper");

app.use(teaApi)

mongoHelper._initMongoDBConnection(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log("Server listening on port ", process.env.APP_PORT);
  });
});
