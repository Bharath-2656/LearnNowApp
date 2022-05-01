var express = require('express');
var router = express.Router();
var config = require('../config');
var server = require('../server');
const app = express();

const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    rating: {
        type: Number,
        required: true,
        
    },
    id: {
      type: Number,
      required: true,
      primaryKey: true,
    },
  });

  const Course = mongoose.model("Course", CourseSchema);
  module.exports = Course;