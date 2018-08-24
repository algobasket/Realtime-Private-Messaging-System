var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

router.route('/')

      // return all messages
     .get(function(req,res){
           if(req.user){
              res.redirect('/welcome');
           }
           res.render('index');
     });

 router.route('/welcome')
       .get(function(req,res){
          var username = req.user.username;
          res.render('welcome',{username : username});
       });

 router.route('/welcome/:id')
       .get(function(req,res){
          var data = {
            username : req.user.username,
            partner : req.params.id,
            room : req.user.username + '-' +req.params.id
          }
          res.render('chat',data);
       });

 router.route('/register')
       .get(function(req,res){
          res.render('signup');
       });

 router.route('/people')
       .get(function(req,res){
          User.find({},{"username":1,"is_online":1,"_id":0},function(err,people){
             if(err){
               res.send(500,err);
             }
            res.send(200,people);
          });
       });

module.exports = router;
