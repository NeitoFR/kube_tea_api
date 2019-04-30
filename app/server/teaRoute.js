const app = require("express").Router(),
  mongoHelper = require("./mongoHelper"),
  cors = require("cors"),
  bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get("/teas", (req, res) => {
  console.log("Got request on ", req.url);
  mongoHelper
    ._getTea(req.params.teaName)
    .then(result => {
      res.send({ res: "GET ALL Route of Tea API", data: result }).end();
    })
    .catch(error => {
      res.send({ res: "ERROR GET ALL Route of Tea API", error: error });
    });
});

app.get("/teas/:teaName", (req, res) => {
  console.log("Got request on ", req.url);
  mongoHelper._getTea(req.params.teaName).then(result => {
    res.send({ res: "GET Route of Tea API", data: result }).end();
  });
});

app.put("/teas", (req, res) => {
  console.log("Got request on ", req.url, req.body);
  mongoHelper._modifyTea().then(result => {
    res.send({ res: "PUT Route of Tea API", data: result }).end();
  });
});

app.post("/teas", (req, res) => {
  console.log("Got request on ", req.url, req.body);
  switch (req.body.order) {
    case "add":
      mongoHelper
        ._addTea(req.body)
        .then(result => {
          res.send({ res: "POST Route of Tea API", data: result }).end();
        })
        .catch(error => {
          res.send({ res: "ERROR Adding Tea", error: error }).end();
        });
      break;

    case "delete":
      mongoHelper._deleteTea(req.body.key, req.body.value).then(result => {
        res.send({ res: "POST Route of Tea API", data: result }).end();
      }).catch(error => {
        res.send({ res: "ERROR Deleting Tea", error: error }).end();
      });
      break;

    default:
      res.send({ error: "Not a valid POST order" }).end();
      break;
  }
});

app.get("/fill", (req, res) => {
  console.log("Got request on ", req.url);
  mongoHelper
    ._fillTeaList(req.params.teaName)
    .then(result => {
      res.send({ res: "Filled with mock data", data: result }).end();
    })
    .catch(error => {
      res.send({ res: "ERROR while filling with mock data", error: error });
  });
})
module.exports = app;
