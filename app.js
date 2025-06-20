//pass : gqYoq1HDV3grabEJ
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use("/",(req,res,next) => {
    res.send("It is working.......");
})

mongoose.connect("mongodb+srv://admin:gqYoq1HDV3grabEJ@cluster0.xkqmtbp.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() =>{
    app.listen(5000);
})
.catch((err) => console.log((err)));