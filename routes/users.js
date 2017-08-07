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

router.get('/:id',function(req, res){
  var id = req.params.id;
  var sql = 'select * from users where id = ?';
  //
  connection.query(sql, id, function(err, rows){
    if(err){
      res.json({msg: 'Error Syntax', err: err});
    }else{
      if(rows.length != 0){ 
        res.render('update',{user:rows[0]});
      }else{
        res.render('update',{user:{msg: 'User no found...'}});
      }  
    }
  });
  
});

router.post('/update/:id', function(req,res){
  var id = req.params.id;
  var query = "update users set ? where id = ?";
   var post = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email
  }

  connection.query(query, [post, id], function(err, result){
    if(err){
      res.json({err:err});   
    }else{
      res.redirect('/users');
    }
  }); 
});

router.get('/delete/:id', function(req, res){
  var id = req.params.id;   

  var query = "delete from users where id = ?";

  connection.query(query, id, function(err, result){
    if(err){
      res.json({err:err});
    }else{
      res.redirect('/users'); 
    }
  });
})

module.exports = router;
