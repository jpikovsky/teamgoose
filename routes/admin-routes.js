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

router.post('/create', (req, res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  var admin=false;
  if (req.body.admin === 'yes'){
    admin = true;
  }
  var user = {name : name, pass : pass, admin : admin};
  model.add(user, (error, newuser) => {
    if(error){
      console.log("ERROR");
    }
  });
  req.flash('admin',"User Added");
  res.redirect('/admin');
});

router.get('/list', (req, res) => {
  var user = req.session.user;
  if (!user){
    req.flash('main', 'user session object does not exist');
    res.redirect('/user/login')
  }
  else if (!user.admin){
    req.flash('main', 'not an admin');
    res.redirect('/user/main')
  } 
  else if (user.admin){
    var uselist;
    model.list( (error,arr) =>{
      if (error !== undefined){
        req.flash('main', error);
        res.redirect('/user/main');
      }
      uselist = arr;
    } );
    var errmess = req.flash('user-list') || '';
    //res.render('user-list', {users : uselist, message : errmess});
    res.render('user-list', {users : uselist, message : errmess});
  }

});

module.exports = router;

