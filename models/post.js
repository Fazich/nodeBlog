var mongodb = require('./db');

function Post(username, post, time) {
    this.user = username;
    this.post = post;
    if (time) {
        this.time = time;
    }
    else {
        this.time = new Date();
    }
};
module.exports = Post;

Post.prototype.save = function save(callback) {
    //锟斤拷锟斤拷Mongodb锟斤拷锟侥碉拷
    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    };
    mongodb.open(function (err, db) {
        if (err) {
            return callback;
        }
        //锟斤拷取posts锟斤拷锟斤拷
        db.collection('posts', function (err, collection) {
            if(err){
                mongodb.close();
                return callback(err);
            }
            //涓簎ser灞炴�ф坊鍔犵储寮�
            collection.ensureIndex('user');
            //鍐欏叆post鏂囨。
            collection.insert(post, {safe:true}, function(err, post){
               mongodb.close();
               callback(err, post); 
            });
        });
    });
};

