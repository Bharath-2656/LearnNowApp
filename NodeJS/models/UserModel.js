var express = require('express');
var router = express.Router();
var config = require('../Config/config');
var server = require('../server');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const { JWT_EXP, JWT_SECRET } = require('../Config/config');
// var mongoDB = 'config.dbUrl';
// mongoose.connect(config.dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

// //Get the default connection
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });
const UserSchema = new mongoose.Schema({
    userid:{
      type:String,
      required:true,
      unique:true,
    },
    name: {
      type: String,
      required: 'Name cannot be empty',
    },
    age: {
      type: Number,
      required:'age cannot be empty'
    },
    email: {
        type: String,
        unique: true,
        primaryKey: true,
        required:'email cannot be empty',
    },
    password: {
        type: String,
        required:'Password cannot be empty',
        minlength: [4, 'Password must be atleast 4 character long'],
    },
    confirm_password: {
        type: String,
        required: 'Confirm password cannot be empty',
    },
    saltSecret:String,
  });
 UserSchema.plugin(uniqueValidator);

  UserSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

UserSchema.pre('save', function(next){
  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(this.password,salt,(err, hash) => {
      this.password=hash;
      this.confirm_password=hash;
      this.saltSecret=this.salt;
      next();
    });
  });
});

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
  return jwt.sign({ userid: this.userid},
      JWT_SECRET,
  {
      expiresIn: JWT_EXP
  });
}

  const User = mongoose.model("User", UserSchema);
  
  module.exports = {User};
  




  
  //SQL

// const Sequelize= require('sequelize');
// const mysql = new Sequelize(
//   'user_schema',
//   'root',
//   'bh1232656',
//   {
//     dialect: 'mysql',
//     host: 'localhost'
//   }
// );


// mysql.authenticate().then(()=> {
//   console.log("Connection established");
// }).catch((err) => {
// console.log("Error");
// })