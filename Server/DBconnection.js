const mysql = require('mysql');

const dbConnection = mysql.createConnection({  
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,  
    password: process.env.DB_PASS,
    database: 'autofleet'  
  });
  
dbConnection.connect((err) => {
    if (!err) {
        console.log('db connection successful')
    } else {
        console.log('db connection failed', err)
    }
});

module.exports = dbConnection;