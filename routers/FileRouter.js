/*
 * @Author: zhangqh zhangqihao@shangyangtai.com
 * @Date: 2023-01-29 10:44:36
 * @LastEditors: zhangqh zhangqihao@shangyangtai.com
 * @LastEditTime: 2023-01-29 14:09:53
 * @FilePath: \cloud\cloud-server\routers\FileRouter.js
 * @Description: 
 * 
 * Copyright (c) 2023 by zhangqh zhangqihao@shangyangtai.com, All Rights Reserved. 
 */
const express = require("express");
const router = express.Router();
const { db, genid } = require("../database/utils");
const uuid = require("uuid");

const config = require("../config");
const { host, port } = config;

// 获取所有文件
router.get("/", async (req, res) => {
  const { err, rows } = await db.async.all("select * from files");
  if (err) {
    res.send({
      code: 500,
      msg: err.message,
      data: []
    });
  } else {
    res.send({
      code: 200,
      msg: "success",
      data: rows
    });
  }
});

// 上传文件
router.post("/", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        code: 500,
        msg: "No file uploaded",
        data: []
      });
    } else {
      const file = req.files.file;
      // console.log(file);
      const type = file.mimetype;
      const file_params = file.name.split(".");
      const file_name = `${uuid.v4()}.${file_params.pop()}`           // 上传到服务器的文件名
      const file_path = `./public/upload/${file_name}`;              // 上传到服务器的文件路径
      const file_url = `http://${host}:${port}/upload/${file_path}`;  // 前端访问的文件路径
      file.mv(file_path);
      try {
        const timestamp = new Date().getTime();
        const result = await db.async.run("insert into files (id, name, path, type, create_time, update_time) values (?, ?, ?, ?, ?, ?)",
          [genid.NextId(), file_params[0], file_url, type, timestamp, timestamp]);
        // console.log(result);
        if (result.err) {
          res.send({
            code: 500,
            msg: result.err.message,
          });
        } else {
          res.send({
            code: 200,
            msg: "success",
          });
        }
      } catch (err) {
        res.send({
          code: 500,
          msg: err.message,
        });
      }
    }

  } catch (error) {
    res.status(500).send(err);
  }

  // const {err, rows} = await db.async.run("insert into files (id, name, path, size, type, create_time) values (?, ?, ?, ?, ?, ?)", [genid.nextId(), "test", "test", 0, "test", new Date().getTime()]);
  // if (err) {
  //   res.send({
  //     code: 500,
  //     msg: err.message,
  //   });
  // } else {
  //   res.send({
  //     code: 200,
  //     msg: "success",
  //   });
  // }
});

module.exports = router;