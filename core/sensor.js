const pool = require('./pool');

function Sensor() {};

Sensor.prototype = {
    // find함수
    find : function(callback)
    {
       //cho 에 sensor테이블 값 선택
        let sql = `SELECT * FROM sensor`

        pool.query(sql, function(err, result) {
            
            if(err) throw err
            if(result.length){
                //첫번째 결과값 즉 센서에 기록된 값 콜백
                callback(result[0]);
            }else {
                console.log('error');
                callback(null)
            }
        })

    }
}

module.exports = Sensor;