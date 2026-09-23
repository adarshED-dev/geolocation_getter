require('dotenv').config(); 
const express = require("express");
const app = express();
const testRoutes = require("./routes/testRoutes")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/", testRoutes)

app.listen(5000, ()=>{
    console.log("server is listening...")
})