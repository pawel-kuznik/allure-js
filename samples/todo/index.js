var express = require('express');
var bodyParser = require('body-parser');

var nocache = function (req, res, next) {

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

var todos = [ ];

var app = express();

app.use(bodyParser.json());

app.get('/todo', nocache, function (req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200).send(todos.filter(function (item) {
        return !!item;
    }));
});

app.get('/todo/:id', nocache, function (req, res) {

    if (req.params.id) {

        var todo = todos[req.params.id];

        if (todo) {
            res.set('Content-Type', 'application/json');
            res.status(200).send(todo);
        }
        else res.status(404).send();

    } else {

        res.status(200).send(todos.filter(function (item) { 
            return !!item;
        }));
    }
});

app.post('/todo', nocache, function (req, res) {
    todos.push(req.body);
    todos[todos.length - 1].id = todos.length - 1;
    res.set('X-Created', todos.length - 1);
    res.status(201).end();
});

app.put('/todo/:id', nocache, function (req, res) {
    todos[req.params.id] = req.body;
   res.status(200).end(); 
});

app.delete('/todo/:id', nocache, function (req, res) {
    todos[req.params.id] = null;
    res.end();
});

app.use('/', express.static(__dirname + '/client'));

app.listen(8080);
console.log('listening on port 8080');
