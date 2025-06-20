//pass : gqYoq1HDV3grabEJ
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");
const app = express();

//middleware
app.use("/users",router)

mongoose.connect("mongodb+srv://admin:gqYoq1HDV3grabEJ@cluster0.xkqmtbp.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() =>{
    app.listen(5000);
})
.catch((err) => console.log((err)));