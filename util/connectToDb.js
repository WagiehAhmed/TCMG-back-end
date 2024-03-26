const mysql = require("mysql");
require("dotenv").config();
const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,

    // host:"localhost",
    // user:"root",
    // password:"",
    // database:"tcmg",
    connectionLimit:10,
})

pool.getConnection((err, conn) => {
    if(err){
        console.log(err)
    }else{
        // console.log(conn)
        console.log("Connected successfully")
    }
})
module.exports = pool;