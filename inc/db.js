const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'meat-manager',
    password: '4200dede'
  })

  module.exports = connection