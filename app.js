const express = require('express');
const path = require('path');
const session = require('express-session')
const pageRouter = require('./routes/pages');;
const app = express();
//파라미터 추출 body parsher
app.use(express.urlencoded({ extended: false}));

//정적 서버 
app.use(express.static(path.join(__dirname, 'public')));

//pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//세션
app.use(session({
    secret: 'parking',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge : 60*1000*30
    }
}
));

//초기화면
//app.get('/', function(req, res) {
    //res.render('index');
//});

//routes에 있는 pages.js로 실행
app.use('/', pageRouter);

//404
app.use ((req, res, next) => {
    var err = new Error ('404 페이지 없음');
    err.status = 404;
    next(err);
});

//서버연결
app.listen(3000, () => {
    console.log('3000번 포트');
});

module.exports = app;