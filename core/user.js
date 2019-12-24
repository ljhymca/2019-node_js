const pool = require("./pool");
const bcrypt = require("bcrypt"); //암호화
//구동원리 알아올 것

function User() {}

User.prototype = {
  // 이메일주소를 db에서 찾는다
  find: function(user = null, callback) {
    // 여기를 모르겠음
    if (user) {
      var field = Number.isInteger(user) ? "id" : "email";
    }

    let sql = `SELECT * FROM users WHERE ${field} = ?`;

    pool.query(sql, user, function(err, result) {
      if (err) throw err;

      if (result.length) {
        callback(result[0]);
      } else {
        callback(null);
      }
    });
  },

  // 새로운 정보를 db에 저장
  create: function(body, callback) {
    let sql = `select * from users where email = "${body.email}"`; // 입력받은 이메일을 현재 디비에 조회
    pool.query(sql, body, function(err, result) {
      if (err) throw err;
      //console.log(result);
      //console.log(result.length);
      if (result.length === 0) {
        // 반환된 리스트의 길이가 0이면 중복 없는 이메일
        var pwd = body.password;
        // db에 저장하기 전에 hash값 삽입
        body.password = bcrypt.hashSync(pwd, 10);

        // 배열에 필드 값 포함
        var bind = [];
      
        for (prop in body) {
          bind.push(body[prop]);
        }
        // sql 쿼리 문 준비
        sql = `INSERT INTO users(email, name, password) VALUES (?, ?, ?)`;
        // 쿼리 호출 후 문자열과 값 넣기
        pool.query(sql, bind, function(err, result) {
          if (err) throw err;
          //에러 없으면 마지막으로 삽입한 아이디(회원가입한 id) 반환
          callback(result.insertId);
        });
      } else {
        callback(null);
      }
    });
  },

  login: function(email, password, callback) {
    // 이메일로 가입되어있는 정보 검색
    this.find(email, function(user) {
      // 이메일이 있는 경우
      if (user) {
        // 비밀번호 확인
        if (bcrypt.compareSync(password, user.password)) {
          // 데이터값
          callback(user);
          return;
        }
      }
      // 아이디 비밀번호 오류시
      callback(null);
    });
  }
};

module.exports = User;
