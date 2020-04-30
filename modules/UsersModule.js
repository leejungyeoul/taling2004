var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

let jwt = require("jsonwebtoken");
let secretObj = require("../ignorefile/jwt");
var ip = require('ip');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
  var m_typ = req.query.type;
  //로그인 정보 조회
  if(m_typ == "login"){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectUser';
  
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "signup"){
    //회원가입 정보 삽입
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertUser';
  
      //비밀번호 암호화 hash알고리즘 사용
      //항상 같은 암호화 pw 취약점 => salting(임의 문자열 concat) 기능 추가

      var myPlaintextPassword = req.body.is_Password;
      if(myPlaintextPassword != '' && myPlaintextPassword != undefined ){
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            req.body.is_Password = hash;
            router.use('/', dbconnect_Module);
            next('route')
          });
        });
      }else{
        router.use('/', dbconnect_Module);
        next('route')
      }
 
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "modify"){
    //나의 정보 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateUser';
      
      var myPlaintextPassword = req.body.is_Password;
      if(myPlaintextPassword != '' && myPlaintextPassword != undefined ){
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            req.body.is_Password = hash;
            router.use('/', dbconnect_Module);
            next('route')
          });
        });
      }else{
        router.use('/', dbconnect_Module);
        next('route')
      }
      
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "pwdmodify"){//비밀번호 재설정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updatePwdUser';
      
      var myPlaintextPassword = req.body.is_Password;
      if(myPlaintextPassword != '' && myPlaintextPassword != undefined ){
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            req.body.is_Password = hash;
            router.use('/', dbconnect_Module);
            next('route')
          });
        });
      }else{
        router.use('/', dbconnect_Module);
        next('route')
      }
      
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "dplicheck"){
    //이메일 중복체크
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectUserDpliCheck';
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "signin" || m_typ =="modinfo"){
    //로그인 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectLoginCheck';
  
      router.use('/', dbconnect_Module);
      next('route')
      
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "pwreset"){
    //비밀번호 재설정시 이메일과 이름으로 사용자 식별
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectLoginResetCheck';
  
      router.use('/', dbconnect_Module);
      next('route')
      
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "pwemail"){
    // 이메일 인증 후 사용자 인증 
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectEmailResetCheck';
  
      router.use('/', dbconnect_Module);
      next('route')
      
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == "SessionState"){
    //이메일, 사용자명 비밀키로 암호화 (쿠키값으로 사용)
    var userid = req.body.is_Email
    var name = req.body.is_UserName

    try {
      //로그인 했을때 이메일 토큰으로 암호화
      let token1 = jwt.sign({
        email: userid   // 토큰의 내용(payload)
      },
      secretObj.secret ,    // 비밀 키
      {
        expiresIn: '60m'    // 유효 시간은 60분
      })

      //로그인 했을때 이름 토큰으로 암호화
      let token2 = jwt.sign({
        username: name   // 토큰의 내용(payload)
      },
      secretObj.secret ,    // 비밀 키
      {
        expiresIn: '60m'    // 유효 시간은 60분
      })

      res.send({"token1":token1, "token2":token2});

      // res.send('succ')
    } catch (error) {
      res.send(error)
    }
  }else if(m_typ == "SessionConfirm"){
    // 쿠키값 이메일, 사용자명 복호화
    try {
      let token1 = req.body.token1;
      let token2 = req.body.token2;
      
      if(token1 != undefined && token1 != '' & token2 != undefined && token2 != ''){
        let decoded1 = jwt.verify(token1, secretObj.secret);
        let decoded2 = jwt.verify(token2, secretObj.secret);
        res.send({"token1":decoded1.email, "token2":decoded2.username});
      }else{
        res.send({"token1":"", "token2":""});
      }
      
    } catch (error) {
      console.log(error);      

      var home_url = ip.address()
      res.redirect(home_url);
    }
  }
});

module.exports = router;