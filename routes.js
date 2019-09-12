module.exports = function(app) {

    app.get('/', function(req, res) {
        res.json('{"name":"gaurav"}');
    });
    
    app.post('/signup', function(req, res) {
        console.log(req);
        console.log(req.body);

        var name = req.body.name;
        var email = req.body.email;

        console.log('Name: ' + name);
        console.log('Email: ' + email);
        res.json(req.body);
    });
};