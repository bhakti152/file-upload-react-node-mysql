const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, path.join(`${__dirname}/../../upload`));
    callback(null, __basedir + "/resources/static/assets/uploads/");

  },
  filename: (req, file, callback) => {
    // const match = ["image/png", "image/jpeg"];

    // if (match.indexOf(file.mimetype) === -1) {
    //   var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
    //   return callback(message, null);
    // }

    var filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("multi-files", 2);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;