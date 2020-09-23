var express = require("express");
const mongoose = require("mongoose");
var user=require('./models/user')
var post=require('./models/post')
var auth=require('./routes/auth')
var post=require('./routes/post')
var app = express();

app.use(express.json())
app.use('/',auth)
app.use('/',post)

mongoose.connect("mongodb://127.0.0.1:27017/Instagram", {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("CONNECTED TO DATA BASE ");
});
mongoose.connection.on("error", (err) => {
  console.log("oops! error occured",err);
});



var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listining to port ${port}`);
});
