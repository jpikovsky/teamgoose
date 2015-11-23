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

router.post('/user', (req, res) => {


  var user = req.session.user;
  if (!user){
    req.flash('main', 'user session object does not exist');
    res.redirect('/user/login')
  }
  else if (user && !online[user.name]){
    req.flash('main', 'login expired');
    res.redirect('/user/main')
  }
  else if (!user.admin && online[user.name]){
    req.flash('main', 'not an admin');
    res.redirect('/user/main')
  }
  else if (!req.body.name || !req.body.pass || !req.body.admin){
    req.flash('user-list', 'bad credentials');
    res.redirect('/admin/list')
  }
  else if (user.admin ===true && online[user.name]){
    model.add(req.body, (error,newu) =>{
      if (error !== undefined){
        req.flash('user-list', error);
        //res.render('user-list', error);
      }
      res.redirect('/admin/list');
    } );
  }
});

module.exports = router;
