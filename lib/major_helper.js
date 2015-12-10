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
	db.listConcentrationCourses(major, (err, reqs) => {
		if(err){
			cb(err);
			return;
		}
		//store concentration, numCompleted, numRemaining
		var info = [];
		for(var i = 0; i < reqs.length; i++){
			var concentration = reqs[i].concentration;
			var dept = reqs[i].dept;
			var num = reqs[i].num;
			var req_satisfied = false;
			//see if taken course
			if(courses){
				for(var j=0; j<courses.length; j++){
					if(courses[j].dept == dept && courses[j].num == num){
						req_satisfied = true;
						break;
					}
				}
			}
			if(concentration in info){
				if(req_satisfied){
					info[concentration].num_satisfied++;
				}
				else{
					info[concentration].num_remaining++;
				}
			}
			else{
				var num_satisfied = 0;
				var num_remaining = 1;
				if(req_satisfied){
					num_satisfied = 1;
					num_remaining = 0;
				}
				info[concentration] = {concentration: concentration, 
									num_satisfied: num_satisfied,
									num_remaining: num_remaining};
			}
		}
		console.log(info);
		//find best one
		var best = undefined;
		for(c in info){
			if(!best){
				best = info[c];
			}
			else{
				if(info[c].num_satisfied > best.num_satisfied){
					best = info[c];
				}
			}
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