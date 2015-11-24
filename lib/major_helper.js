var index = 0;

var db = require('../db');

exports.list = (major, cb) => {
  db.listCourses(major, cb);

};