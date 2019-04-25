const express = require("express"), 
    app = express(),
    _ = require("lodash")

app.get("/hello", (req, res) => {
    console.log("Got request on /hello", req.route);
    res.send("Hello from tea API").end()
})

app.listen(process.env.port, () => {
    console.log("Server listening on port ", port);  
})