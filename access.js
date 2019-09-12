module.exports.saveBook = function (db, title, author, text, callback) {
    db.collection('text').save({
        title: title,
        author: author,
        text: text
    }, callback);
};

module.exports.findBookByTitle = function (db, title, callback) {
    db.collection('text').findOne({
        title: title
    }, function (err, doc) {
        if (err || !doc) callback(null);
        else callback(doc.text);
        console.log(doc)
    });
};
module.exports.find = function (db, callback) {
    db.collection('text').find({}).toArray(function (err, doc) {
        if (err || !doc) callback('{"status":"error"}');
        else callback(doc);
    });
};
module.exports.findBookByTitleCached = function (db, redis, title, callback) {
    redis.get(title, function (err, reply) {
        if (err) callback(null);
        else if (reply) //Book exists in cache
        {
        callback(JSON.parse(reply));
        console.log("from cache")
        }
        else {
            //Book doesn't exist in cache - we need to query the main database
            console.log("from database")
            db.collection('text').findOne({
                title: title
            }, function (err, doc) {
                if (err || !doc) callback(null);
                else {
                    redis.set(title, JSON.stringify(doc), function () {
                        callback(doc);
                    });
                }
            });
        }
    });
};
