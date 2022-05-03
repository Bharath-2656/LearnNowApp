var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
    instructorid:{
      type:String,
      // required:true,
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
    description: {
        type:String,
    },
    password: {
        type: String,
        required:'Password cannot be empty',
        minlength: [4, 'Password must be atleast 4 character long'],
    },
    instructorid: {
      type: Number,
    },
    saltSecret:String,
  });

  InstructorSchema.pre("save", function (next) {
    var docs = this;
    mongoose
      .model("Instructor", InstructorSchema)
      .countDocuments({ account: docs.name }, function (error, counter) {
        if (error) return next(error);
        docs.instructorid = counter + 1;
        next();
      });
  });

  const Instructor = mongoose.model("Instructor", InstructorSchema);
  
  module.exports = {Instructor};