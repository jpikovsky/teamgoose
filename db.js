var pg = require('pg');
var constr = "postgres://wcdszfyc:0f0OH7YVlbuxfiK6YV7e0D5CBkJouUmk@pellefant.db.elephantsql.com:5432/wcdszfyc";

exports.addCourse = (course,cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'INSERT INTO courses values ($1, $2)';

    client.query(quer, [course.num,course.dept,course.description,course.instructor,course.semester, course.year], (err, result) => {
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
exports.removeCourse() = (c_num, c_dept, semester, year,cb){

  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    var quer  = "DELETE from courses where name = $1 and dept = $2 and semester = $3 and year = $4";

    client.query(quer, [c_num, c_dept,semester,year], (err, result) => {
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

  }

}

//Add new users to database.

exports.addUsers = (user,cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'INSERT INTO users values ($1, $2, $3)';

    client.query(quer, [user.name,user.password,user.admin], (err, result) => {
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


//Admin ability to access all users data or particular user.

exports.getUsers = (user,cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    var quer;
    if(user == NULL)
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
      cb(undefined, result);
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
    client.query(quer,[user.name] (err, result) => {
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

exports.removeUser() = (name,cb){

  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }
    var quer  = "DELETE from users where name = $1";

    client.query(quer, [name], (err, result) => {
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

  }

}



/*

db.getRequirements();

*/
