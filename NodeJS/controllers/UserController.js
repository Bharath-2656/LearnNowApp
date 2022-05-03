const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const { User} = require("../models/UserModel");
const { Course} = require("../models/CourseModel");
const bodyParser = require("body-parser");
// const { $where } = require('../models/UserModel');
var { AreaOfInterest } = require('../models/areaOfInterestModel');
const courseController = require("../controllers/CourseController")
const passport = require('passport');
const jwtHelper = require('../Config/jwtHelper');
var router = express.Router();
const app = express();
const loadash = require('lodash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.get('/users', async (req, res) =>
{
    User.find((err, data) =>
    {
        if (!err)
        {
            res.send(data);
            console.log("data collected")
        }
        else { console.log("Error in getting data : " + err); }
    });
});


app.post('/users', (req, res) =>
{
    var user = new User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        courseid: req.body.courseid,
    });
    user.save((err, doc) =>
    {
        if (!err)
        {
            res.send(doc);
            console.log("Data saved");
        }
        else
        {
            console.log('Error in saving data :' + err);
            res.send(err.message);
        }
    });
});

app.get('/users/:userid', (req, res) =>
{
    // if(!ObjectId.isValid(req.params.userid))
    // return res.status(400).send(`No record found for: ${req.params.userid}`);
    User.findOne({ userid: req.params.userid }, `name age email`, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log("Error in retreiving data") }
    });
});

app.put('/users/:userid', (req, res) =>
{
    var user = {
        name: req.body.name,
        age: req.body.age,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
    };
    User.findOneAndUpdate({ userid: req.params.userid }, { $set: user }, { new: true }, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log(`Error in updating user`); }
    });
});

app.delete('/users/:userid', (req, res) =>
{
    User.findOneAndRemove(req.params.userid, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log("Error in deleting user"); }
    });
});

app.post('/authenticate', (req, res, next) =>
{
    passport.authenticate('local', (err, user, info) =>
    {
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res);
});

app.get('/userprofile', jwtHelper.verifyJwtToken, (req, res, next) =>
{
    User.findOne({ userid: req.userid },
        (err, user) =>
        {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: loadash.pick(user, ['name', 'email']) });
        }
    );
});

app.post('/areaofinterest', (req, res) =>
{
    var areaofinterest = new AreaOfInterest({
        name: req.body.name,
        imagesrc: req.body.imagesrc,
        routerlink: req.body.name.replace(/\s+/g, '').toLowerCase(),
    });
    areaofinterest.save((err, doc) =>
    {
        if (!err)
        {
            res.send(doc);
            console.log("Data saved");
        }
        else
        {
            console.log('Error in saving data :' + err);
            res.send(err.message);
        }
    });
});

app.get('/areaofinterest', async (req, res) =>
{
    AreaOfInterest.find((err, data) =>
    {
        if (!err)
        {
            res.send(data);
            console.log("data collected")
        }
        else { console.log("Error in getting data : " + err); }
    });
});


 app.get('/usercourse', async (req, res) =>
{
    Course.aggregate([
        {
            $lookup: {
                from: "areaofinterests",
                localField: "routrelink",
                foreignField: "category",
                as: "areaofinterest_courses",
            },
        },
        // {
        //     $unwind: "$user_courses",
        // },
    ])
        .then((result) =>
        {
             //console.log(JSON.stringify(result));
            res.send(result);
        })
        .catch((error) =>
        {
            console.log(error);
        });
});

module.exports = app;