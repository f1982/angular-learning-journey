const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller.js");

let routes = (app) => {
  router.get("/", controller.home);
  router.post("/upload", controller.upload);
  router.post("/uploads", controller.uploadMultiple);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  router.get("/post", async (req, res) => {
    try {
      console.log('req', req);
      console.log('res', res);

    } catch (err) {
      console.log('err', err);
    }
  });

  app.get('/test', (req, res) => {
    res.send('Hello World!')
  })

  app.use(router);
};

module.exports = routes;
