var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport= require('passport');
var authenticate = require("../authenticate");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//notice leader router has no ; so it is the obejct or .all .get .post .put .delete method below it
router.post('/signup',(req, res, next) => {    /*************latest modification */

  User.register(new User({username: req.body.username}),
  req.body.password,(err,user) =>{
      if(err) {
        res.statusCode= 500;
        res.setHeader('Content-Type','application/json');
        res.json({err: err});  
      }
      else{
        if (req.body.firstname)
            user.firstname = req.body.firstname;
        if (req.body.lastame)
            user.lastname = req.body.lastname;
        user.save((err, user) => {
          if(err) {
            res.statusCode= 500;
            res.setHeader('Content-Type','application/json');
            res.json({err: err});  
            return;
          }
          else{
            passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful' });
        });
          
        }});
      }

    });
});


//notice leader router has no ; so it is the obejct or .all .get .post .put .delete method below it
router.post('/login',passport.authenticate('local'),(req,res) => {

  var token = authenticate.getToken({_id: req.user._id});// similarly 3rd party token can be get via function
  res.statusCode= 200;
  res.setHeader('Content-Type','application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in' });

});


router.get('/logout', (req,res,next) => {
  if(authenticate.verifyUser){
    console.log("I m in");
    //req.session.destroy();//remove d session info
    res.clearCookie('session-id');//destroying cookie on client side
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in hello!');
    err.status = 403;
    next(err);
  }
}); 

module.exports = router;
