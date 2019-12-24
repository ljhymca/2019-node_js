const util = require ('util');
const mysql = require ('mysql');
//root에 cho db로 접속
const pool = mysql.createPool({
    connectionLimit: 10,
    host :'localhost',
    user :'root',
    password : 'tjdtjeo20',
    database : 'cho'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;