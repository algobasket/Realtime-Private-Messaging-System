var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

 module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		//res.send({state: 'success', user: req.user ? req.user : null});
		res.redirect('/welcome');
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//log out
	router.get('/signout', function(req, res) {
    User.update({'username':{$eq : req.user.username }},{$set:{'is_online':0}},function(err,result){
      if(err)
        return done(err);

        console.log("user is offline");
    });
    req.logout();
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        }

        // destroy session data
        req.session = null;

        // redirect to homepage
        res.redirect('/');
    });
	});

	return router;

}
