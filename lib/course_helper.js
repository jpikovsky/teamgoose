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

exports.listDeptCourses = (dept,cb) => {
    db.listDeptCourses(dept,cb);
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

exports.getCourse = (dept,num,cb)=>{
	db.getCourse(dept,num,cb);
};

exports.getCoursePreReqs = (course_id,cb)=>{
	db.getCoursePreReqs(course_id,cb);
};