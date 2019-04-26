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
  _getTea: async teaName => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      if (teaName) {
        resolve("Getting tea : ", teaName);
      } else {
        resolve("Getting all teas");
      }
    })

    // return new Promise((resolve, reject) => {
    //   con
    //     .db(MONGO_DB)
    //     .collection(MONGO_COL)
    //     .find({ teaName: teaName }, { projection: { _id: 0 } })
    //     .toArray((err, res) => {
    //       console.log("Found " + res.length + " results.");
    //       if (!err) {
    //         resolve(res)
    //       } else {
    //         reject(err)
    //       }
    //     });
    // })
  },
  _addTea: async tea => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      resolve("Adding tea : ", tea);
    })   
  }, 
  _modifyTea: async tea => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      resolve("Adding tea : ", tea);
    })
  }, 
  _deleteTea: async filter => {
    while (con.isConnected() != true) {
      console.log("Connexion not setup, try to reconnect...");
      await connect();
    }
    return new Promise((resolve, reject) => {
      resolve("Deleting tea by", filer.key, " : ", filter.value);
    })
  }, 
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
