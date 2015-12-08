var index = 0;

var db = require('../db');

exports.listDepartments = (cb) => {
  db.listDepartments(cb);
}

exports.listUserCourses = (username, cb) => {
  db.listUserCourses(username, cb);
};

exports.adminAdd = (c, cb) => {
	db.alreadyCourse(c, (err) => {
		if(err){
			cb(err);
		}
		else{
			db.addCourse(c,cb);
		}
	})
};

exports.userAdd = (c,username, cb) => {
	db.alreadyUserCourse(c, username, (err) => {
		if(err){
			cb(err);
		}
		else{
			db.addUserCourse(c,username,cb);
		}
	});
};

exports.listAllCourses = (cb) => {
    db.listAllCourses(cb);
};

exports.deleteCourse = (c,cb) => {
	db.notAlreadyCourse(c, (err) => {
		if(err){
			cb(err);
		}
		else{
			db.removeCourse(c,cb);
		}
	});
};