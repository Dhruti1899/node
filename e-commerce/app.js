const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const connection = require("./config/mysqlDB");

const app = express();

// database init
function mysqlConnect() {
  global.connection = mysql.createConnection(connection);

  global.connection.connect(function (err) {
    
    if (err) {
      console.log("error when connecting to db",err);
      setTimeout(mysqlConnect, 2000);
    }
    console.log("connected to database");
  });
  global.connection.on("error", function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      mysqlConnect();
    } else {
      throw err;
    }
  });
}

mysqlConnect();

// Routes
const CountryRoutes = require("./routes/countryrouter/country");
const StateRoutes = require("./routes/staterouter/state")
const CityRoutes = require("./routes/cityrouter/city")
const TalukaRoutes = require("./routes/talukarouter/taluka")
const RoleRoutes = require("./routes/rolerouter/role")
const Addressbook=require("./routes/addressbookrouter/addressbook")
const User=require("./routes/userrouter/user")
// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes   
app.use("/", CountryRoutes);
app.use("/", StateRoutes); 
app.use("/", CityRoutes);
app.use("/", TalukaRoutes);
app.use("/",RoleRoutes);
app.use("/",Addressbook);
app.use("/",User);
// PORT
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
