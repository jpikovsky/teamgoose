var db = require('../db');

exports.formatCourseInfo = (list) => {
	for(i = 0; i<list.length; i++){
		list[i].req_desc = list[i].dept + ' ' + list[i].num;
	}
	return list;
}

exports.getConcentrations = (major, cb) => {
	db.getConcentrations(major, cb);
};

exports.getMajors = (cb) => {
	db.getMajors(cb);
};

exports.list = (major, concentration, cb) => {
	db.listCourses(major, concentration, cb);
};