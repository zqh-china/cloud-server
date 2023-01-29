/*
 * @Author: zhangqh zhangqihao@shangyangtai.com
 * @Date: 2023-01-29 10:32:51
 * @LastEditors: zhangqh zhangqihao@shangyangtai.com
 * @LastEditTime: 2023-01-29 13:55:47
 * @FilePath: \cloud\cloud-server\app.js
 * @Description: 
 * 
 * Copyright (c) 2023 by zhangqh zhangqihao@shangyangtai.com, All Rights Reserved. 
 */
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const { port, host } = config;
const FileRouter = require('./routers/FileRouter');

// 使能文件上传
app.use(fileUpload({
  createParentPath: true
  }));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/files', FileRouter);

app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`);
});