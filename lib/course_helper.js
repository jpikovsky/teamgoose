var index = 0;

var db = require('../db');

function course(dept, num) {
  return {
    dept: dept,
    num: num
  };
}

var courses = {};

exports.listDepartments = (cb) => {
  db.listDepartments(cb);
}

exports.listUserCourses = (username, cb) => {
  db.listUserCourses(username, cb);
};

exports.adminAdd = (c, cb) => {
    db.addCourse(c,cb);
};

exports.userAdd = (c,username, cb) => {
    db.addUserCourse(c,username,cb);
};