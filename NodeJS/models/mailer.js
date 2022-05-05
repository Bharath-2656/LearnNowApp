// import nodemailer from "nodemailer";
import { request } from "../controllers/CourseController";
const nodemailer = require('nodemailer');
const { mailPassword } = require('./config');
const express = require('express');
const app = express();

app.get('/users', async (req, res) =>
{
let transprter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bharathstarck@gmail.com",
        password: mailPassword,
    },
    tls: {
        rejectUnauthorized:false,
    }
});

let mailOptions = {
    from: "bharathstarck@gmail.com", 
    to: "bharath2000madhu@gmail.com",
    subject: "Test email",
    text: "this is test mail works"
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

});
module.exports= app;

