const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var {User} = require('../models/UserModel');
//var User = mongoose.model('User');
//var User  = require('/Users/VC/Documents/VS_Code_workspace/NodeJS/hello/models/UserModel')
passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err); 
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    else
                        return done(null, user);
                });
        })
);