var express = require('express');
var StringConnection = require('../config/bd_string');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection(StringConnection);
/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = "SELECT * FROM users";

  connection.query(query,function(err, rows){
    if(err){
      res.json({msg: 'Error Syntax', err: err});
    }else{
      if(rows.length != 0){
        res.render('users',{users:rows});
      }else{
        res.render('users',{users:{msg: 'User no fouen...'}});
      }  
    }
  });
});

router.post('/',function(req,res){
  var query = "INSERT INTO users SET ?";
  var post = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email
  }

  connection.query(query, post, function(err, result){
    if(err){
      res.json({err:err});
    }else{
      res.redirect('users');
    }
  });
});

module.exports = router;
