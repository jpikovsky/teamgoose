var db = require('../db');

exports.formatCourseInfo = (list) => {
	var info = [];
	console.log(list);
	for(i = 0; i<list.length; i++){
		var req_num = list[i].req_num;
		var dept = list[i].dept;
		var num = list[i].num;
		if(req_num in info){
			info[req_num].req_desc += ' or ' + dept + ' ' + num;
			info[req_num].req_options.push({dept: dept, num: num});
			console.log(info[req_num].req_options);
		}
		else{
			var req_desc = dept + ' ' + num;
			var req_options = [];
			req_options.push({dept: dept, num: num});
			var new_elem = {req_num: req_num, req_desc: req_desc, req_options: req_options};
			info[req_num] = new_elem;
		}
		// list[i].req_desc = list[i].dept + ' ' + list[i].num;
	}
	return info;
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

exports.addRequirement=(req,major,concentration,cb)=>{
	db.addRequirement(req,major,concentration,cb);
}