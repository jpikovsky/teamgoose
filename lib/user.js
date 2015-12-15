// A library for representing a user "model".

var database = require('../db');

exports.list = (cb) => {
  database.getUsers(null,cb);
};

exports.verify = (name, pass, cb) => {
  database.verifyUser(name, pass, cb);
};

exports.removeUser = (name, cb) => {
  database.removeUserCourses(name, (err) => {
    if(err){
      cb(err);
    }
    else{
      database.removeUser(name, cb);
    }

  });
};

exports.add = (u, cb) => {
  database.userExists(u.name, (err) => {
    if(err){
      cb(err);
    }
    else{
      database.addUser(u, cb);
    }
  });
};

exports.changePassword = (u, newpass, cb) => {
    database.changePassword(u, newpass, cb);
};
