const mysql = require("mysql");

const pool = mysql.createPool({
    host:"localhost",
    user:"tcmtest",
    password:"amAM123123",
    database:"tcmtest",
    connectionLimit:3,
})

pool.getConnection(()=>{
    console.log("connected to tcmg database")
})

module.exports = pool;