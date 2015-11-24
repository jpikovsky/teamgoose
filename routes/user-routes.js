var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Provides a login view
router.get('/login', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user) {
    res.redirect('/user/main');
  }
  else{
    res.render('login');
  }
});

// Performs **basic** user authentication.
router.post('/auth', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form:
    var name = req.body.name;
    var pass = req.body.pass;

    if (!name || !pass) {
      req.flash('login', 'did not provide the proper credentials');
      res.redirect('/user/login');
    }
    else {
      model.verify(name, pass, function(error, user) {
        if (error) {
          // Pass a message to login:
          req.flash('login', error);
          res.redirect('/user/login');
        }
        else {

          // create a session variable to represent stateful connection
          req.session.user = user;

          // Pass a message to main:
          req.flash('main', 'authentication successful');
          res.redirect('/user/main');
        }
      });
    }
  }
});

router.post('/new', (req, res) => {
  res.redirect('/user/new');
});

router.post('/new/create', (req, res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  var admin = false;
  var user = {name : name, pass : pass, admin : admin};
  model.add(user, (error, newuser) => {
    if(error){
      console.log("ERROR");
    }
  });
  res.redirect('/user/login');
});

router.get('/new', function(req, res) {
  res.render('create_user');
});

router.get('/profile', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  if (!user) {
    res.redirect('/user/login');
  }
  else{
    res.render('profile', {name: user.name});
  }


});

// Performs logout functionality - it does nothing!
router.get('/logout', function(req, res) {
  // Grab the user session if logged in.
  var user = req.session.user;

  // If the client has a session, but is not online it
  // could mean that the server restarted, so we require
  // a subsequent login.
  if (user) {
    delete req.session.user;
  }

  // Redirect to login regardless.
  res.redirect('/user/login');
});

// Renders the main user view.
router.get('/main', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else {
    // capture the user object or create a default.
    var message = req.flash('main') || 'Login Successful';
    res.render('user', { title   : 'User Main',
                         message : message,
                         name    : user.name });
  }
});



module.exports = router;
