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
							req_satisfied: req_satisfied,
							};
			info[req_num] = new_elem;
		}
	}
	// console.log(info);
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
			var reqs_done = [];
			var reqs_missed = [];
			var req_num = reqs[i].req_num;
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
					if(info[concentration].reqs_done.indexOf(req_num) < 0){
						info[concentration].num_satisfied++;
						info[concentration].reqs_done.push(req_num);
					}
					var miss_index = info[concentration].reqs_missed.indexOf(req_num);
					if(miss_index >= 0){
						info[concentration].num_remaining--;
						info[concentration].reqs_missed.splice(miss_index, 1);
					}
				}
				else{
					if(info[concentration].reqs_done.indexOf(req_num) < 0 && info[concentration].reqs_missed.indexOf(req_num) < 0){
						info[concentration].num_remaining++;
						info[concentration].reqs_missed.push(req_num);
					}
				}
			}
			else{
				var num_satisfied = 0;
				var num_remaining = 1;
				if(req_satisfied){
					num_satisfied = 1;
					num_remaining = 0;
					reqs_done.push(req_num);
				}
				else{
					reqs_missed.push(req_num);
				}
				info[concentration] = {concentration: concentration, 
									num_satisfied: num_satisfied,
									num_remaining: num_remaining,
									reqs_done: reqs_done,
									reqs_missed: reqs_missed};
			}
		}
		// console.log(info);
		//find best one
		var best = undefined;
		for(c in info){
			if(!best){
				best = info[c];
			}
			else{
				if(info[c].num_remaining < best.num_remaining){
					best = info[c];
				}
				else if(info[c].num_remaining == best.num_remaining && info[c].num_satisfied > best.num_satisfied){
					best = info[c];
				}
			}
		}

		cb(undefined, best.concentration);
	});
};

exports.inspireMajor = (courses, cb) => {
	db.listAllMajorsAndConcentrationCourses( (err, reqs) => {
		if(err){
			cb(err);
			return;
		}
		//store concentration, numCompleted, numRemaining
		var info = [];
		for(var i = 0; i < reqs.length; i++){
			var major_id = reqs[i].major_id;
			var major = reqs[i].major;
			var concentration = reqs[i].concentration;
			var dept = reqs[i].dept;
			var num = reqs[i].num;
			var req_satisfied = false;
			var req_num = reqs[i].req_num;
			var reqs_done = [];
			var reqs_missed = [];
			//see if taken course
			// console.log(courses);
			if(courses){
				for(var j=0; j<courses.length; j++){
					if(courses[j].dept == dept && courses[j].num == num){
						req_satisfied = true;
						break;
					}
				}
			}
			if(major_id in info){
				if(req_satisfied){
					if(info[major_id].reqs_done.indexOf(req_num) < 0){
						info[major_id].num_satisfied++;
						info[major_id].reqs_done.push(req_num);
					}
					var miss_index = info[major_id].reqs_missed.indexOf(req_num);
					if(miss_index >= 0){
						info[major_id].num_remaining--;
						info[major_id].reqs_missed.splice(miss_index, 1);
					}
				}
				else{
					if(info[major_id].reqs_done.indexOf(req_num) < 0 && info[major_id].reqs_missed.indexOf(req_num) < 0){
						info[major_id].num_remaining++;
						info[major_id].reqs_missed.push(req_num);
					}
				}
				// if(req_satisfied){
				// 	info[major_id].num_satisfied++;
				// }
				// else{
				// 	info[major_id].num_remaining++;
				// }
			}
			else{
				var num_satisfied = 0;
				var num_remaining = 1;
				if(req_satisfied){
					num_satisfied = 1;
					num_remaining = 0;
					reqs_done.push(req_num);
				}
				else{
					reqs_missed.push(req_num);
				}
				info[major_id] = { major: major,
									concentration: concentration, 
									num_satisfied: num_satisfied,
									num_remaining: num_remaining,
									reqs_done: reqs_done,
									reqs_missed: reqs_missed};
			}
		}
		// console.log(info);
		//find best one
		var best = undefined;
		for(c in info){
			if(!best){
				best = info[c];
			}
			else{
				if(info[c].num_remaining < best.num_remaining){
					best = info[c];
				}
				else if(info[c].num_remaining == best.num_remaining && info[c].num_satisfied > best.num_satisfied){
					best = info[c];
				}
			}
		}

		cb(undefined, best.major, best.concentration);
	});
};

exports.getMajorsWithCourse = (course, cb) => {
	db.getMajorsWithCourse(course, cb);
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