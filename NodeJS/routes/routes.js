const express = require("express");
const userModel = require("../models/UserModel");
const userController = require("../controllers/UserController")
const cors = require("cors");
var bodyParser = require('body-parser');
var router = express.Router();
const app = express();


app.use(router);
app.use(cors());
app.use(bodyParser.json());



// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","*")
//   res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE")
//   res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization")
//   next()
// })

app.get('/home',(req,res)=>{
  res.send("Hii")
})
app.listen(9000, () => {
  console.log("Server is running at port 9000");
});



app.use('/admin', userController);

 

module.exports = app;