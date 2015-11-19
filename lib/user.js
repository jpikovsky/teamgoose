// A library for representing a user "model".

var database = require('../db');

// Represents the next user ID:
var nextUID = 0;

// A function for creating "users".
function user(name, pass, admin) {
  return {
    name: name,
    pass: pass,
    uid : ++nextUID,
    admin : admin
  };
}

// This is an in-memory mock database until we look at a real one!
var db = {
  'tim'  : user('tim', 'mit', true),
  'hazel': user('hazel', 'lezah', false),
  'caleb': user('caleb', 'belac', false)
};

// Returns a user object if the user exists in the db.
// The callback signature is cb(error, userobj), where error is
// undefined if there is no error or a string indicating the error
// that occurred.
exports.lookup = (usr, pass, cb) => {
  if (usr in db) {
    var u = db[usr];
    if (pass == u.pass) {
      cb(undefined, { name: u.name, admin: u.admin });
    }
    else {
      cb('password is invalid');
    }
  }
  else {
    cb('user "' + usr + '" does not exist')
  }
};

exports.list = (cb) => {
  var users = []
  for(var u in db){
    users.push({
    name: db[u].name,
    pass: db[u].pass,
    uid : db[u].uid,
    admin : db[u].admin
    });
  }
  cb(undefined, users);
};

exports.add = (u, cb) => {
  database.addUser(u, cb);
  // if(u.name in db){
  //   cb('could not add user because user already exists', u);
  // }
  // else{
  //   new_user = user(u.name, u.pass, u.admin);
  //   u.uid = new_user.uid;
  //   db[new_user.name] = new_user;
  //   cb(undefined, u);
  // }
};