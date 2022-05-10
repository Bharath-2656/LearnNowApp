const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const { User} = require("../models/UserModel");
const { Course} = require("../models/CourseModel");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
var { AreaOfInterest } = require('../models/areaOfInterestModel');
const courseController = require("../controllers/CourseController")
const passport = require('passport');
const jwtHelper = require('../Config/jwtHelper');
var router = express.Router();
const app = express();
const loadash = require('lodash');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);


//Getting all users
app.get('/users', async (req, res) =>
{
    User.find((err, data) =>
    {
        if (!err)
        {
            res.send(data);
        }
        else { console.log("Error in getting data : " + err); }
    });
});

//Posting user detials to database
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


//getting the details of a particular user
app.get('/users/:userid', (req, res) =>
{
    User.findOne({ userid: req.params.userid }, `name age email`, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log("Error in retreiving data") }
    });
});


//Updating record of a particular user
app.put('/users/:userid', (req, res) =>
{
    var user = {
        name: req.body.name,
        age: req.body.age,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        courseid: req.body.courseid,
    };
    User.findOneAndUpdate({ userid: req.params.userid }, { $set: user }, { new: true }, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log(`Error in updating user`); }
    });
});

// Updating the courseid to User after Enrollment
app.put('/usercourse/:userid', (req, res) =>
{
    
    var user = {
        courseid: req.body.courseid
    };
    console.log(req.body);
    User.findOneAndUpdate({ userid: req.params.userid }, { $push: user }, { new: true }, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log(`Error in updating user`); }
    });
});

//Deleting the user from the database
app.delete('/users/:userid', (req, res) =>
{
    User.findByIdAndRemove(req.params.userid, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log("Error in deleting user"); }
    });
});

var  useridforrefresh="manoj@gmail.com";

//Authenticating the user upon login and generating refresh and access token
app.post('/authenticate', (req, res, next) =>
{
    passport.authenticate('local', (err, user, info) =>
    {
        if (err) return res.status(400).json(err);
        else if (user)
            {
                var user1 = {
                    refreshtoken: user.generateRefreshToken()
                    
                };
                
                useridforrefresh = req.body.email;
                const refresh_token = user.generateRefreshToken();
                User.findOneAndUpdate({ email: req.body.email }, {  refreshtoken: user.generateRefreshToken() })
                return res.status(200).json( { "token": user.generateJwt(), });
            }
        else return res.status(404).json(info);
    })(req, res);
});


//Generating access token if refersh token is valid and access token is expired
app.post('/token', async (req,res,next) =>
{
    const userfortoken = await User.findOne({ email: useridforrefresh }, 'userid refreshtoken').exec();
    
    jwt.verify(userfortoken.refreshtoken,process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err)
                return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
            else {
                    return res.status(200).json( { "token": userfortoken.generateJwt() });
                next();
            }
        }
    )
});


//getting all userprofiles Admin access
app.get('/userprofile',  (req, res, next) =>
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

/*  Area of intfrest section to be moved to seperate controller */

//adding area of Intrest
app.post('/areaofinterest',  (req, res) =>
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

//Getting all the area of interest 
app.get('/areaofinterest',  async (req, res) =>
{
    AreaOfInterest.find((err, data) =>
    {
        if (!err)
        {
            res.send(data);
        }
        else { console.log("Error in getting data : " + err); }
    });
});

//mapping the usercourse with the user using llokup in mongo
 app.get('/usercourse', async (req, res) =>
{
    Course.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "courseid",
                foreignField: "courseid",
                as: "user_courses",
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


//Sending mail upon enrollment of a course
app.post('/course_mail', async (req, res) =>
{
    console.log(req.params.courseid);
let transprter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bharathstarck@gmail.com",
        pass: process.env.pass,
    },
    tls: {
        rejectUnauthorized:false,
    }
});

let mailOptions = {
    from: "bharathstarck@gmail.com", 
    to: "bharath2000madhu@gmail.com",
    subject: "Confirmation of enrollemnt",
    // html:{path: `http://localhost:4200/user/confirmenrollment`}
    text: "You have successfully enrolled in the" + req.body.courseid + "on the LearnNow application"
}
// transprter.sendMail(mailOptions,function(err,success){
//     if(err)
//     {
//         console.log(err);
//     }
//     else 
//     {
//         console.log("Email has been sent sucessfully");
//     }
// });
    res.send("Email sent")
});

//Sending mail upon successful registeration to the application 
app.post('/user_mail', async (req, res) =>
{
    
let transprter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bharathstarck@gmail.com",
        pass: process.env.pass,
    },
    tls: {
        rejectUnauthorized:false,
    }
});

let mailOptions = {
    from: "bharathstarck@gmail.com", 
    to: "bharath2000madhu@gmail.com",//to be changed
    subject: "Confirmation of Registration",
    // html:{path: `http://localhost:4200/user/confirmenrollment`}
    text: "Dear " + req.body.name +  " you have successfully registered on the LearnNow application. Please login to continue"
}
transprter.sendMail(mailOptions,function(err,success){
    if(err)
    {
        console.log(err);
    }
    else 
    {
        console.log("Email has been sent sucessfully");
    }
});
    res.send("Email sent")
});



module.exports = app;