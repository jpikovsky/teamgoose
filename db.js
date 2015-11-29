var pg = require('pg');
var constr = "postgres://wcdszfyc:0f0OH7YVlbuxfiK6YV7e0D5CBkJouUmk@pellefant.db.elephantsql.com:5432/wcdszfyc";

exports.addCourse = (course,cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'INSERT INTO courses values ($1, $2, $3, $4, $5, $6)';

    client.query(quer, [course.num,course.dept], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined);
    });

  });
};

// Get all courses for given semester and year

exports.getAllCourses = (semester, year,cb,c_num,c_dept)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'SELECT * from courses where semester = $1 and year = $2)';

    client.query(quer, [course.semester, course.year], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if(result.rows.length == 0){
      	cb("No results returned.");
      	return;
      }

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined,result);
    });

  });
};

// Get course description for given semester and year

exports.getCourseDesc = (c_num,c_dept,semester, year,cb)=>{
  var result = getAllCourses(semester,year,cb,c_num,c_dept);
  if(result != NULL){
  	return result;
  }
};

// Only admin should be able access to remove course
exports.removeCourse = (c_num, c_dept, semester, year,cb)=>{

  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    var quer  = "DELETE from courses where name = $1 and dept = $2";

    client.query(quer, [c_num, c_dept], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined,result);
    });

  });

};

exports.userExists = (name, cb) => {

  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' +err);
      return;
    }

    var quer = 'select * from users where username=$1';
    client.query(quer, [name], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if(result.rows.length != 0){
        // console.log('in function: user already exists');
        cb('user already exists');
        return;
      }
      // console.log('in function: user does not already exist');
      cb(undefined);
    });
  });
};

//Add new users to database.
exports.addUser = (user,cb)=>{

  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'INSERT INTO users values ($1, $2, $3)';

    client.query(quer, [user.name,user.pass,user.admin], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        // console.log('in add user later: ' + err);
        cb('could not connect to the database: ' + err);
        return;
      }

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined);
    });

  });
};

exports.changePassword = (user, newpass, cb) => {
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'update users set pass=$1 where username=$2';

    client.query(quer, [newpass,user.name], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        // console.log('in add user later: ' + err);
        cb('could not connect to the database: ' + err);
        return;
      }

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined);
    });

  });
};

// Lookup user for login
exports.verifyUser = (name, pass, cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'select * from users where username=$1 and pass=$2';

    client.query(quer, [name,pass], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        // console.log("in verify user: " + err);
        cb('could not connect to the database: ' + err);
        return;
      }

      if(result.rows.length == 0){
        cb("No results returned");
        return;
      }

      //make user
      var admin = result.rows[0].admin;
      var user = {name: name, pass: pass, admin: admin};

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined, user);
    });

  });
};

//Admin ability to access all users data or particular user.

exports.getUsers = (user,cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    var quer;
    if(!user)
      quer = 'SELECT * from users';
  	else
  	  quer = 'SELECT * from users where fname = '+user.name;
    client.query(quer, (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if(result.rows.length == 0){
      	cb("No results returned");
      	return;
      }

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined, result.rows);
    });

  });
};

// Regular user access to particular user data.

exports.getUser = (user,pass, cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    var quer = 'SELECT * from users where name = $1';
    client.query(quer,[user.name], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }
      if(result.rows.length == 0){
      	cb('User ' + user.name +' does not exist');
      	return;
      }

      // (7) otherwise, we invoke the callback with the user data.

      if(result.rows[0].pass != pass){
      	cb('Incorrect password for '+user.name);
      	return;
      }

      cb(undefined, result.rows[0]);
    });

  });
};

exports.removeUser = (name,cb) => {

  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    var quer  = "DELETE from users where username = $1";

    client.query(quer, [name], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      // (7) otherwise, we invoke the callback with the user data.
      cb(undefined);
    });

  });

};

exports.getMajors = (cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'select distinct major from majors';

    client.query(quer, (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if(result.rows.length == 0){
        cb("No results returned");
        return;
      }

      cb(undefined, result.rows);
    });

  });
};

exports.getConcentrations = (major, cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'select concentration from majors where major=$1';

    client.query(quer, [major], (err, result) => {
      // call done to release the client back to the pool:
      done();

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if(result.rows.length == 0){
        cb("No results returned");
        return;
      }

      cb(undefined, result.rows);
    });

  });
};

exports.listCourses = (major, concentration, cb) => {

  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' +err);
      return;
    }

    var quer = 'select reqs.req_num, course_list.dept, course_list.num from reqs join majors on reqs.major_id=majors.major_id join course_list on course_list.course_id=reqs.course_id where majors.major=$1 and majors.concentration=$2';
    client.query(quer, [major, concentration], (err, result) => {
      done();
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }

      if(result.rows.length == 0){
        cb("No results returned");
        return;
      }

      cb(undefined, result.rows);
    });
  });
};

exports.addUserCourse = (course,username,cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var course_id;
    var user_id;

    var quer = 'select id from courses where dept =$1 and num=$2 UNION select id from users where username =$3';
    client.query(quer, [course.dept,course.num,username], (err, result) => {
      // call done to release the client back to the pool:
      

      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }
      // (7) otherwise, we invoke the callback with the user data.

      if(result.rows.length < 2){
        cb("no results returned");
        return;
      }
      course_id = result.rows[0].id;
      console.log("cid >>>>>> "+course_id);
      user_id = result.rows[1].id;
      console.log("cid >>>>>> "+user_id);

      done();

      insert(course_id,user_id,cb);

    });


    
      
  });
};

function insert(course_id,user_id,cb){
  

pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    quer = 'insert into student_courses values ($1,$2)';

    client.query(quer, [course_id,user_id], (err, result) => {
      // call done to release the client back to the pool:
      done();
      // (4) check if there was an error querying database:
      if (err) {
        cb('could not connect to the database: ' + err);
        return;
      }
      
      cb(undefined);
    });
  });

}


/*

db.getRequirements;

*/
