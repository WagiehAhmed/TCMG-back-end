const express = require("express");
const express_fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const app =  express();





// // const bodyParser = require("body-parser"); 
// // app.use(bodyParser.json());

// database connection 
const pool = require("./util/connectToDb");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(cors());
app.use(helmet());
dotenv.config();
app.use(express_fileUpload());


// const logger = require("./middlerwares/logger")
// app.use(logger);

// routes
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/admins",adminRoutes)
app.use("/api/blogs",blogRoutes)

app.listen(process.env.PORT,()=>console.log(`server is listening on port ${process.env.PORT}`));