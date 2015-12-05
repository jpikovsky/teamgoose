var index = 0;

var db = require('../db');

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

exports.listAllCourses = (cb) => {
    db.listAllCourses(cb);
};

exports.deleteCourse = (c,cb) => {
    db.removeCourse(c,cb);
};