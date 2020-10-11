var express = require("express");
const mongoose = require("mongoose");
var Scrap = require('../../models/scrap_Data');
var requireLogin = require("../../middleware/requireLogin");
var adminRoute = express.Router();

//ALL_POST

adminRoute.get("/adminAllData",  (req, res) => {
  Scrap.find( )
    .then((mypost) => {
      res.status(200).json({ mypost });
    })
    .catch((error) => {
      console.log(error);
    });
});



module.exports =adminRoute;
