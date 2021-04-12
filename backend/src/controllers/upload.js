const upload = require("../middleware/upload");
const fs = require("fs");

const db = require("../models");
const Image = db.images;
const multipleUpload = async (req, res) => {
  try {
    console.log('req:', req.files);

    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    Image.create({
      picture: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.files[0].filename
      ),
      file: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.files[1].filename
      ),
    }).then((image) => {
      console.log('after image crate:', image);

      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
    // return res.send(`Files has been uploaded.`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};
const findOne = (req, res) => {
  const id = req.params.id;

  Image.findByPk(id)
    .then(data => {
      console.log('get data:', data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};
module.exports = {
  multipleUpload: multipleUpload,
  findOne: findOne
};