var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'testdb1',
});

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Connected to testbd1');
    }
});

app.get('/',function(req, res, next){
    connection.query('SELECT * FROM mytesttable', function(err, rows){
        if(err){
            console.log(err);
        }else{
            res.end(JSON.stringify(rows));
        }
    });
});

app.post('/', function(req, res){
    connection.query('INSERT INTO mytesttable (id,text) values(?,?)', [req.body.id, req.body.text], function(err, rows){
        if(err){
            console.log(err);
        }else{
            res.end(JSON.stringify(rows));
        }
    });
});

app.delete('/:id', function(req, res ){
    connection.query('DELETE FROM mytesttable WHERE id=?', [req.params.id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            res.end(JSON.stringify(rows));
        }
    });
});

app.put('/', function(req, res ){
    connection.query('UPDATE mytesttable SET text=? WHERE id=?', [req.body.text, req.body.id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            res.end(JSON.stringify(rows));
        }
    });
});


app.listen(3000);