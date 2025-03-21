const express = require("express");
const app = express();
const mongdb = require("./data/database");
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    )
    res.setHeader("Acess-Control-Allow-Meathods", "Get, Post, Put, Delete, Options");
    next();
});
app.use("/", require("./routes/index"))

const port = process.env.PORT || 3001;


process.on("uncaughtException", (err, origin)=>{
    console.log(process.stderr.fd, `caught exception: ${err}\n` * `Exception origin: ${origin}`);
});


mongdb.initdb((err) =>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () =>{
            console.log("Database is listening at " + ((port)));
        });
    }
});