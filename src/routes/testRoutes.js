const express = require("express")
const router = express.Router();
const pool = require("../config/db");

router.post("/add/geolocation", async (req, res)=>{
    const {latitude, longitude, user_name, mac_address, mac_name} = req.body;
    if(!latitude || !longitude || !user_name || !mac_address || !mac_name){
        return res.status(400).json({
            message: "Bad Request: please check request parameters again!"
        })
    }
    try {
        const result = await pool.query(
            `INSERT INTO data (latitude, longitude, user_name, mac_address, mac_name) VALUES ($1, $2, $3, $4, $5)`, 
            [latitude, longitude, user_name, mac_address, mac_name]
        )
        res.status(200).json({
            message: "Data added successfully!",
        })
    } catch (error) {
        console.error(error)
        res.json({
            message: "Data not added successfully."
        })
    }
})
router.get("/get/geolocation/data/overall", async (req, res)=>{
    try{
        const result = await pool.query(`SELECT * FROM data`)
        res.json({
            message: "Data Fetched Successfully",
            body: result.rows
        })
    }catch (error) {
        console.error(error)
        res.json({
            message: "unable to fetch data"
        })
    }
})
module.exports = router;

