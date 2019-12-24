const express = require('express');
const User = require('../core/user');
const Senseor = require('../core/sensor');
const router = express.Router();
const user = new User();
const sensor = new Senseor();
//get indexpage
router.get('/',(req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.redirect('/home');
        return;
    }
    res.render('index', {title:"My application"});
})
//주차장 정보 표시할 곳
router.get('/home', (req, res, next)=> {
    let user = req.session.user;
    if(user) {
        sensor.find(function(result) {
            
            let data = result.data_sensor;
            res.render('home', {opp:req.session.opp, name:user.name,data})
            return
        })
    }
  
});

//로그인 창에서 로그인한 정보
router.post('/login', (req, res, next) => {
   user.login(req.body.email, req.body.password, function(result) {
        if(result) {
            req.session.user = result;
            req.session.opp = 1;

            res.redirect('/home'); //home으로 이동 
        }else{
            res.send('올바르지않은 아이디 혹은 비밀번호입니다.');
        }
   });
});

//mysql에 정보 등록
router.post('/register', (req,res,next) => {
    let userInput = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password

    };
    user.create(userInput, function(lastID) {
        if(lastID){
            res.send('등록되었습니다 '+ userInput.name +' 님');
        }
        else{
            res.send('error');
        }
    });
});
   
 

//회원가입 정보
router.post('/register', (req, res, next) => {
    

});


router.get('/logout',(req, res, next) => {
    if(req.session.user) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});





module.exports = router;