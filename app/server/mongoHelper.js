const mdb = require("mongodb"),
  _ = require("lodash");

var con = null;

const MONGO_URL = process.env.MONGO_URL,
  MONGO_DB = process.env.MONGO_DB,
  MONGO_COL = process.env.MONGO_COL;

module.exports = {
  _initMongoDBConnection: cb => {
    connect()
      .then(val => {
        console.log("Connection to Mongo DB : OK ");
        cb();
      })
      .catch(err => {
        console.log("Error connecting to mongodb" + err);
      });
  },
  _getTea: async options => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      if (options) {
        var filter = "teaName", value = options
        con
          .db(MONGO_DB)
          .collection(MONGO_COL)
          .find({filter: value}, { projection: { _id: 0 } })
          .toArray((err, res) => {
            console.log("Found " + res.length + " results.");
            err ? reject(err) : resolve(res);
          });
      } else {
        con
          .db(MONGO_DB)
          .collection(MONGO_COL)
          .find({}, { projection: { _id: 0 } })
          .toArray((err, res) => {
            console.log("Found " + res.length + " results.");
            err ? reject(err) : resolve(res);
          });
      }
    });
  },
  _addTea: async tea => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      con
        .db(MONGO_DB)
        .collection(MONGO_COL)
        .insertOne(tea, (err, res) => {
          err ? reject(err) : resolve(res);
        });
    });
  },
  
  _deleteTea: async (key, value) => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      console.log("Trying to delete ", key, value);
      key = "\""+key+"\"";
      con
        .db(MONGO_DB)
        .collection(MONGO_COL)
        .deleteOne({ "teaName": value }, (err, res) => {
          console.log('Result from delete : ', err, res.deletedCount);
          
          err ? reject(err) : resolve(res);
        });
    });
  },
  _fillTeaList: async () => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      con
        .db(MONGO_DB)
        .collection(MONGO_COL)
        .insertMany([
          {
            "teaName": "Kusmitea Choco",
            "teaFlavor": "Cholate & Spicies",
            "teaRate": "4"
          },
          {
            "teaName": "Elephant Infusion",
            "teaFlavor": "Apple & Cinnamon",
            "teaRate": "2"
          },
          {
            "teaName": "Russian Lipton",
            "teaFlavor": "Bergamot",
            "teaRate": "5"
          },
          {
            "teaName": "Twinings",
            "teaFlavor": "Raspberry & Passion",
            "teaRate": "3"
          },
          {
            "teaName": "Twinings",
            "teaFlavor": "Coco & Passion",
            "teaRate": "3"
          },
          {
            "teaName": "Carrefour",
            "teaFlavor": "Peach & Mango",
            "teaRate": "3"
          },
          {
            "teaName": "Richards",
            "teaFlavor": "Mint",
            "teaRate": "4"
          },
          {
            "teaName": "Dammann",
            "teaFlavor": "Rose & Tulip",
            "teaRate": "4"
          }
        ]
        , (err, res) => {
          err ? reject(err) : resolve(res);
        });
    });
  }
};
function connect() {
  return new Promise((resolve, reject) => {
    mdb.MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, db) => {
      if (err) {
        // console.log("Error connecting to mongodb" + err);
        reject(err);
      } else {
        con = db;
        resolve();
      }
    });
  });
}
