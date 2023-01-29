const path = require('path');
const userConfig = {
  port: 3000,
  host: '127.0.0.1',
  db: {
    sqlite3: {
      database: 'files.sqlite3',
      path: path.join(__dirname, '../database/files.sqlite3')
    }
  }
}

module.exports = userConfig;