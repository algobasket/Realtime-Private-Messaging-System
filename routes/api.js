var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

router.route('/messages')

      // return all messages
     .get(function(req,res){
           res.send({ message : "return all messages"});
     })

      // create a new mes
     .post(function(req,res){
          //res.send({ message : "create a new message"});
          var newMessage = new Message();
          newMessage.text = req.body.textMessage;
          newMessage.room = req.body.room;
          newMessage.created_by = req.body.created_by;
          newMessage.send_to = req.body.send_to;
          newMessage.save(function(err,newMessage){
             if(err){
               console.log("Message Not Send:" + err);
               throw err;
             }
             console.log("Message Sent To");
             return res.json(newMessage);
          });
     });

 router.route('/messages/:id')

      .get(function(req,res){
         res.send({ message : "Return message for that id" + req.params.id });
      })

      .put(function(req,res){
         res.send({ message : "update message for " + req.params.id });
      })

      .delete(function(req,res){
         res.send({ message : "delete message" + req.params.id });
      });


   router.route('/allUserMessages/:id')
     .get(function(req,res){
       var room = '/' + req.user.username + '-' +req.params.id;
       var room2 = '/' + req.params.id + '-' + req.user.username;
       Message.find({$or:[{"room" : room},{"room" : room2}]},function(err,data){
           if(err){
             res.send(500,err);
           }
           res.json(data);
       });
     });

module.exports = router;
