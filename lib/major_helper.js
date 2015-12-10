var db = require('../db');

exports.formatCourseInfo = (reqs, courses) => {
	var info = [];
	for(var i = 0; i<reqs.length; i++){
		var req_num = reqs[i].req_num;
		var dept = reqs[i].dept;
		var num = reqs[i].num;
		if(req_num in info){
			info[req_num].req_desc += ' or ' + dept + ' ' + num;
			info[req_num].req_options.push({dept: dept, num: num});
			if(courses && info[req_num].req_satisfied == 'No'){
				for(var j=0; j<courses.length; j++){
					if(courses[j].dept == dept && courses[j].num == num){
						info[req_num].req_satisfied = 'Yes';
						break;
					}
				}
			}
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
};

exports.calculateStats = (info) => {
	var completed = 0;
	var remaining = 0;
	for(var req in info){
		if(info[req].req_satisfied === 'Yes'){
			completed++;
		}
		else{
			remaining++;
		}
	}
	var stats = [];
	stats[0] = completed;
	stats[1] = remaining;
	return stats;
};

exports.inspireConcentration = (major, courses, cb) => {
	db.getConcentrations(major, (err, concentrations) => {
		if(err){
			cb(err);
			return;
		}
		var best = {};
		for(var c in concentrations){
			var concentration = concentrations[c].concentration;
			exports.list(major, concentration, (err, reqs) => {
				if(err){
					cb(err);
					return;
				}
				var info = exports.formatCourseInfo(reqs, courses);
				var stats = exports.calculateStats(info);
				var numCompleted = stats[0];
				var numRemaining = stats[1];
				if(!best.concentration){
					best.concentration = concentration;
					best.numCompleted = numCompleted;
					best.numRemaining = numRemaining;
				}
				else{
					if(numRemaining < best.numRemaining){
						best.concentration = concentration;
						best.numCompleted = numCompleted;
						best.numRemaining = numRemaining;
					}
				}
			});
		}
		cb(undefined, best.concentration);
	});
};

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