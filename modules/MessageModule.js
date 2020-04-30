var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var fs = require('fs')
var ip = require('ip');
const axios = require('axios');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
  var m_typ = req.query.type;

  if(m_typ == 'email'){
    //이메일 발송
    var m_roll = req.query.roll;
    let email = req.body.is_Email;
    let subject = req.body.is_Subject;
    var text = req.body.is_Text;
    var postpone_txt = text
    text = text.substr(0, 20)

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: '01032883398a@gmail.com',  // gmail 계정 아이디를 입력
        pass: 'wjdduf0834!'          // gmail 계정의 비밀번호를 입력
      }
    });

    console.log('AWS ip : ' + ip.address());

    var home_url = ''
    if(ip.address() == '172.17.0.2'){
      home_url = 'http://15.164.5.237:3000'
    }else{//운영서버 ip가 아닌 경우 모두 로컬처리
      home_url = 'http://localhost:3000'
    }

    var toHtml = ''
    if(m_roll == 'resetpw'){
      // 비밀번호 재설정 메일 발송
      fs.readFile(__dirname+'/template/mail_template_pw.html', function (err, html) {
        toHtml = html.toString()
        toHtml = toHtml.replace('{replacetext}', home_url+'/PwChangeForm/'+ email +'/'+text)
      })
    }else if(m_roll == '2daybefore'){
        // 프로젝트 종료 2일전 메일 발송
        var pjtName = req.body.is_PjtName;
        fs.readFile(__dirname+'/template/mail_template_notice.html', function (err, html) {
          toHtml = html.toString()
          toHtml = toHtml.replace('{replacetext}', pjtName)
        })
    }else if(m_roll == 'basic'){
      // 단순 알림 메일 발송
      fs.readFile(__dirname+'/template/mail_template_basic.html', function (err, html) {
        toHtml = html.toString()
        toHtml = toHtml.replace('{replacetext}', postpone_txt)
      })
     }

    var email_use = true
    axios.post(home_url+'/api/system?type=system', {
      //사이트 이메일 사용유무 체크
    })
    .then( response => {
      if(response.data.json[0].email_ym == 'Y'){
        email_use = true
      }else if(response.data.json[0].email_ym == 'N'){
        email_use =  false
      }
    })
    .catch( response => {console.log('fail1'+response)} ); 

    setTimeout(function() {
      let mailOptions = {
        from: 'rtrodemail@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: subject,   // 제목
        html : toHtml
      };

    if(email_use){
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent: ' + info.response);
        }
      });
    }else{
      console.log('Email sent: 이메일 사용유무를 Y로 변경하세요 email_use :'+email_use);
    }
      res.redirect("/");
    }.bind(this),1000
    );
  }

});

module.exports = router;