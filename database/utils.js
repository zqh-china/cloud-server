/*
 * @Author: zhangqh zhangqihao@shangyangtai.com
 * @Date: 2023-01-29 10:38:31
 * @LastEditors: zhangqh zhangqihao@shangyangtai.com
 * @LastEditTime: 2023-01-29 14:02:41
 * @FilePath: \cloud\cloud-server\database\utils.js
 * @Description: 
 * 
 * Copyright (c) 2023 by zhangqh zhangqihao@shangyangtai.com, All Rights Reserved. 
 */
const sqlite3 = require('sqlite3').verbose();
const GenId = require('../utils/snowflake');
const sqlite3_path = require('../config').db.sqlite3.path;

var db = new sqlite3.Database(sqlite3_path);
const genid = new GenId({WorkerId: 1})



db.async = {}

db.async.all = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            resolve({err, rows});
        })
    })
}
db.async.run = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err, rows) => {
            resolve({err, rows});
        })
    })
}

module.exports = {db, genid};