var express = require('express');

var helper = require('../lib/major_helper');

var db = require('../db');

var router = express.Router();

router.get('/', (req, res) => {
  var user = req.session.user;
  if (!user) {
    req.flash('login', 'You must be logged in to access your courses');
    res.redirect('/user/login');
  }
  else{
      res.render('professors',{user:user,admin:user.admin});   
  }
});

router.post('/helper', (req, res) => {
    var user = req.session.user;
    db.getProfessors(req.body.last,req.body.first,(err,result)=>{
    if(err){
      req.flash('/professors',err);
      res.redirect('/professors');
                }
                else{
                  res.render('professors',{prof:result,user:user,admin:user.admin}); 
                }       

  });


  });

module.exports = router;