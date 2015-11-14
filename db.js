var pg = require('pg');
var constr = "postgres://wcdszfyc:0f0OH7YVlbuxfiK6YV7e0D5CBkJouUmk@pellefant.db.elephantsql.com:5432/wcdszfyc";

exports.addCourses = (course,cb)=>{
  pg.connect(constr, (err, client, done) => {
    // (2) check for an error connecting:
    if (err) {
      cb('could not connect to the database: ' + err);
      return;
    }

    var quer = 'INSERT INTO courses values ($1, $2)';

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
/*
db.addUsers(user){

}

db.getUsers();   //Admin access only

db.getClasses();

db.getRequirements();

*/
