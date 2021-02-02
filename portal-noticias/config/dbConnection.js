const mysql = require('mysql');

const connMySQL = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'portal_noticias'
  });
}

module.exports = () => {
  return connMySQL;
}