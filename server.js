var express = require('express');
var indexRouter = require('./routes/index');
var swtoolRouter = require("./routes/SwtoolRout");
var fileuploadRouter = require("./routes/UploadRout");
var BatchRout = require("./routes/BatchRout");
var usersRouter = require("./routes/UsersRout");
var MessageRoutRouter = require("./routes/MessageRout");
//
var app = express();

app.use('/', indexRouter);

//sw Tool 조회
app.use("/api/Swtool", swtoolRouter);

//파일 업로드
app.use("/api/upload", fileuploadRouter);

//파일 업로드 경로 설정
app.use(express.static("./uploads"));

//로그인 조회
app.use("/api/LoginForm", usersRouter);

//회원가입 정보 입력
app.use("/api/register", usersRouter);

//시스템 배치
app.use("/api/BatchRout", BatchRout);

//알림, 메일 전송
app.use("/api/message", MessageRoutRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
