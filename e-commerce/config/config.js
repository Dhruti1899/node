
var mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

connection.connect((err) => {
    if (!err)
        console.log('Database connected successfully');
    else
        console.log('Database connection failed' + JSON.stringify(err, undefined, 2));
});
// const headers={
//     'Content-Type':'application/json'
// }


module.exports={
    // headers,
    // con
    connection
}
