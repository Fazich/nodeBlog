var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: '首页'
	});
});


router.get('/u/:user', function(req, res, next) {

});
router.post('/post', function(req, res, next) {

});
//router.get('/reg', checkNotlogin);
router.get('/reg', function(req, res, next) {
	res.render('reg', {
		title: '用户注册'
	});
});
//router.post('/reg', checkNotlogin);
router.post("/reg",function(req,res) {
	if (req.body['passwordrepeat'] != req.body['password']) {
        req.flash('error', '两次输入的口令不一致');
        return res.redirect('/')
	}
	console.log(req.body['password']);


	var newUser = new User({
		name: req.body.username,
		password: req.body.password
	});
	//检查用户名是否已经存在
	User.get(newUser.name, function(err, user) {
		if (user)
			err = 'Username already exists.';
		if (err) {
			req.flash('error', err);
			return res.redirect('/reg');
		}

		newUser.save(function(err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			//req.flash('success', '注册成功');
            req.send()
			res.redirect('/');
		});
	});
});
//router.get('/login', checkNotlogin);
router.get('/login', function(req, res, next) {
	res.render('login',{
		title: '用户登入'
	});
});
//router.post('/login', checkNotlogin);
router.post('/login', function(req, res, next) {
	var password = req.body.password;
	User.get(req.body.username, function(){
		if(!user){
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if(user.password != password){
            req.flash('error', '密码错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
	});
});
router.get('/logout', checkLogin);
router.get('/logout', function(req, res, next) {
    res.render('index',{
       title: '首页'
    });
});

function checkLogin(req, res, next){
    if(req.session.user){
        req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}

function checkNotLogin(req, res ,next){
    if(req.session.user){
        req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}


module.exports = router;