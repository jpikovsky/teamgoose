var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// A list of users who are online:

//var online = require('../lib/online').online;


// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/', (req, res) => {
  var user = req.session.user;
  if (!user){
    req.flash('login', 'user session object does not exist');
    res.redirect('/user/login')
  }
  else if (!user.admin){
    req.flash('main', 'Not an Admin');
    res.redirect('/user/main')
  }
  else if (user.admin){
    res.render('admin');
  }

});


module.exports = router;

