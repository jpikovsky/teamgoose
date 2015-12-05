var db = require('../db');

exports.getCredits = (username,cb) => {
  db.getUserCredits(username,cb);
}
