var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// A list of users who are online:
<<<<<<< HEAD
//var online = require('../lib/online').online;
=======
var online = require('../lib/online').online;
>>>>>>> 46ef8de247a0764edf2f2bf38405e5fc3772a5b3

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

<<<<<<< HEAD
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
  
>>>>>>> 46ef8de247a0764edf2f2bf38405e5fc3772a5b3
  else if (user.admin){
    res.render('admin');
  }

});

router.post('/user', (req, res) => {
<<<<<<< HEAD


=======
  // TODO: Implement the /user route.
  // This route is similar to the /user/auth route in that it does not
  // have an associated view. Rather, its job is to add a new user and
  // redirect to /admin/list. Its job is to add a new user if the user
  // does not already exist in our model. You must make sure you do
  // the following in this route:
  //
  //   (1) Grab the user session object.
  //   (2) Test that the user session object exists. If not, a redirect
  //       back to the login view is necessary with a proper flash message.
  //   (3) Test if the user session exists and they are not online. If
  //       the user session exists and they are not online it means the
  //       server has been restarted and their session has expired. If
  //       this is the case you will need to redirect back to login with
  //       a proper flash message (e.g., login expired).
  //   (4) Test is the user is an admin. If they are not you need to
  //       redirect back to main with a proper flash message - indicate
  //       that the user needs admin credentials to access this route.
  //   (5) If the user is logged in, they are online, and they are an
  //       admin then you need to grab the form variables from the
  //       `req.body` object. Test to make sure they all exist. If they
  //       do not then you need to redirect back to the `/list` route
  //       defined above with a proper flash message.
  //   (6) If you have received the proper form variables then you must
  //       create a new user using the `model.add` function. If an error
  //       message is returned in the callback you should flash that message
  //       to the `list` route above passing it the error message returned
  //       from the `model.add` function and redirect to `list`.
  //       Otherwise, you should flash to `list` that the user has
  //       been added and redirect back to the `list` route.
  //
  //  You will be graded on each of the above items.

  // Replace below with your implementation.
 
>>>>>>> 46ef8de247a0764edf2f2bf38405e5fc3772a5b3
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

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 46ef8de247a0764edf2f2bf38405e5fc3772a5b3
