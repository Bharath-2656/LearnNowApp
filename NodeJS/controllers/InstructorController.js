const express = require('express');
const { Instructor} = require('../models/InstructorModel');
const bodyParser = require("body-parser");

var router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.get('/instructors', async (req, res) =>
{
    Instructor.find((err, data) =>
    {
        if (!err)
        {
            res.send(data);
        }
        else { console.log("Error in getting data : " + err); }
    });
});

app.post('/instructors', (req, res) =>
{
    var instructor = new Instructor({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        description: req.body.description,
        password: req.body.password,
        instructorid: req.body.name.replace(/\s+/g, '').toLowerCase(),
        numberofcourses: req.body.numberofcourses,
        numberofstudents: req.body.numberofstudents,
    });
    instructor.save((err, doc) =>
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

app.get('/instructors/:instructorid', (req, res) =>
{
    // if(!ObjectId.isValid(req.params.userid))
    // return res.status(400).send(`No record found for: ${req.params.userid}`);
    Instructor.findOne({ instructorid: req.params.instructorid }, `name age email`, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log("Error in retreiving data") }
    });
});

app.put('/instructors/:instructorid', (req, res) =>
{
    var instructor = {
        name: req.body.name,
        age: req.body.age,
        password: req.body.password,
        description: req.body.description,
        numberofcourses: req.body.numberofcourses,
        numberofstudents: req.body.numberofstudents,
    };
    Instructor.findOneAndUpdate({ instructorid: req.params.instructorid }, { $set: instructor }, { new: true }, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log(`Error in updating user`); }
    });
});

app.delete('/instructors/:instructorid', (req, res) =>
{
    Instructor.findOneAndRemove(req.params.instructorid, (err, doc) =>
    {
        if (!err) { res.send(doc); }
        else { console.log("Error in deleting user"); }
    });
});

module.exports = app;