var db = require('../db');

exports.formatCourseInfo = (reqs, courses) => {
	var info = [];
	console.log(courses);
	// console.log(list);
	for(var i = 0; i<reqs.length; i++){
		var req_num = reqs[i].req_num;
		var dept = reqs[i].dept;
		var num = reqs[i].num;
		if(req_num in info){
			info[req_num].req_desc += ' or ' + dept + ' ' + num;
			info[req_num].req_options.push({dept: dept, num: num});
			// console.log(info[req_num].req_options);
		}
		else{
			var req_desc = dept + ' ' + num;
			var req_options = [];
			req_options.push({dept: dept, num: num});
			var req_satisfied = 'No';
			if(courses){
				for(var j=0; j<courses.length; j++){
					if(courses[j].dept == dept && courses[j].num == num){
						req_satisfied = 'Yes';
						break;
					}
				}
			}
			var new_elem = {req_num: req_num, 
							req_desc: req_desc, 
							req_options: req_options,
							req_satisfied: req_satisfied};
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