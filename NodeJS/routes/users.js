var express = require('express');

var router = express.Router();

// let mysql = require('mysql2');

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'bh1232656',
//   //database: 'user_schema'
// });
// var jsonResponse=[];
// var email=[];
// connection.query(`SELECT * FROM user_schema.user_model`,(err,res)=>
// {
//     jsonResponse=res;
//     for(var i=0;i<jsonResponse.length;i++)
//     {
//       email=jsonResponse[i].email;
      
//     }
// })

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.json(jsonResponse);
// });


// module.exports = router;


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

// const Users = mysql.define('usertable',{
//   id:{
//     type: Sequelize.DataTypes.NUMBER,
//     allowNull: false
//   },
//   name:{
//     type: Sequelize.DataTypes.STRING
//   },
//   age:
//   {
//     type: Sequelize.DataTypes.NUMBER
//   },
//   email:
//   {
//     type: Sequelize.DataTypes.STRING,
//     primaryKey: true
//   },
//   password:
//   {
//     type: Sequelize.DataTypes.STRING
//   },
//   confirm_password:
//   {
//     type: Sequelize.DataTypes.STRING
//   }

// });
// Users.sync().then((data) =>
// {
//   console.log("Sync completed");
// }).catch((err) =>
// {
// console.log("Error");
// });


module.exports = router;
