const app = require("express").Router();

app.get("/tea", (req, res) => {
  console.log("Got request on ", req.url);
  res.send("GET ALL Route of Tea API").end();
});

app.get("/teas/:teaName", (req, res) => {
  console.log("Got request on ", req.url);
  mongoHelper._getTea(req.params.teaName).then(result => {
    res.send("GET Route of Tea API" + result).end();
  });
});

app.put("/teas", (req, res) => {
  console.log("Got request on ", req.url);
  mongoHelper._modifyTea().then(result => {
    res.send("PUT Route of Tea API" + result).end();
  });
});

app.post("/teas", (req, res) => {
  console.log("Got request on ", req.url);
  mongoHelper._addTea().then(result => {
    res.send("POST Route of Tea API" + result).end();
  });
});

app.delete("/teas", (req, res) => {
  console.log("Got request on ", req.url);
  mongoHelper._deleteTea().then(result => {
    res.send("DELETE Route of Tea API" + result).end();
  });
});

module.exports = app;