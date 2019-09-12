
var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    app = express(),
    mongoUrl = 'mongodb://localhost:27017/testData';

    var redisClient = require('redis').createClient;
    var redis = redisClient(6379, 'localhost');

var access = require('./access.js');

MongoClient.connect(mongoUrl,{useUnifiedTopology: true, useNewUrlParser: true}, function (err, db) {
    if (err) throw 'Error connecting to database - ' + err;
    var bodyParser = require('body-parser');
    var routes = require('./routes.js')(app);

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.post('/book', function (req, res) {
        console.log(req.body.title)
        console.log(req.body.author)
        console.log(req.body.text)
        if (!req.body.title || !req.body.author) res.status(400).send("Please send a title and an author for the book");
        else if (!req.body.text) res.status(400).send("Please send some text for the book");
        else {
            access.saveBook(db, req.body.title, req.body.author, req.body.text, function (err) {
                if (err) res.status(500).send("Server error");
                else res.status(201).send("Saved");
            });
        }
    });

    app.get('/book/:title', function (req, res) {
        if (!req.param('title')) res.status(400).send("Please send a proper title");
        else {
            access.findBookByTitle(db, req.param('title'), function (book) {
                console.log(book)
                if (!book) res.status(500).send("Server error");
                else res.status(200).send(book);
            });
        }
    });
    app.get('/bookcache/:title', function (req, res) {
        if (!req.param('title')) res.status(400).send("Please send a proper title");
        else {
            access.findBookByTitleCached(db, redis, req.param('title'), function (book) {
                if (!book) res.status(500).send("Server error");
                else res.json(book);
            });
        }
    });
    app.get('/books', function(req, res) {
        console.log(req.body)
        access.find(db, function (books) {
            //console.log(books)
            res.json(books);
        });
    });
    app.listen(8000, function () {
        console.log('Listening on port 8000');
    });
});
