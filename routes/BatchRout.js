var express = require('express');
var router = express.Router();
var cron = require('node-cron');


//매일 00시 5분 실행
// cron.schedule('5 0 * * *', () => {

// cron.schedule('1 0 * * *', () => {
//1분마다 실행
cron.schedule('0 0 * * *', () => {

  var mapper = 'CommonMapper';//mybatis xml 파일명
  var crud = 'insert';//select, insert, update, delete 중에 입력
  var mapper_id = 'insertBatchlog';

  var param = { is_Batchnm: '테스트 배치', is_Batchlog: '테스트 배치가 정상 실행되었습니다. ' };
  console.log('#######  배치 실행 / 테스트 배치 #######');

  const mysql = require('mysql');
  const mybatisMapper = require('mybatis-mapper');

  const connection = mysql.createConnection({
    host: "database-1.c9kj98ezdrrz.ap-northeast-2.rds.amazonaws.com",
    port: "3306",
    database: 'rtrod',
    user: "rtrod_user",
    password: "ajoumed1025",
  });

    mybatisMapper.createMapper(['./models/'+mapper+'.xml']);
    var time1 = new Date();
    console.log('## '+time1+ ' ##');
    console.log("\n Called Mapper Name  = "+mapper);

    //질의문 형식
    var format = { language: 'sql', indent: '  ' };
    var query = mybatisMapper.getStatement(mapper, mapper_id, param, format);
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log("* mapper namespce : "+mapper+"."+mapper_id+" *\n");
    console.log(query+"\n");

    connection.connect();
    connection.query(query, function (error, results, fields) {  //조회
      if (error) {
        console.log("db error************* : "+error);
      }
      var time2 = new Date();
      console.log('## '+time2+ ' ##');
      console.log('## RESULT DATA LIST ## : \n', results);
      string = JSON.stringify(results);
      var json = JSON.parse(string);

      console.log("========= Node Mybatis Query Log End =========\n");
    });

    connection.end();
  
});


module.exports = router;