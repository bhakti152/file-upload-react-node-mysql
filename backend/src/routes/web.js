const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");

let routes = app => {
  router.get("/", homeController.getHome);

  router.post("/multiple-upload", uploadController.multipleUpload);
  router.get("/multiple-upload/:id", uploadController.findOne);

  return app.use("/", router);
};

module.exports = routes;