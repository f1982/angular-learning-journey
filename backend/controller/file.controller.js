const uploadMiddleware = require("../middleware/upload");
const fs = require('fs');

const baseUrl = 'http://localhost:8080/files/'
const baseFolder = '/public/files/'

const home = async (req, res) => {
  res.render('index');
}

const upload = async (req, res) => {
  try {
    await uploadMiddleware.uploadFile(req, res);;

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send(JSON.stringify({ location: baseUrl + req.file.originalname }));
  } catch (err) {
    console.log('err', err);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const uploadMultiple = async (req, res) => {
  try {
    await uploadMiddleware.uploadFiles(req, res);
    res.status(200).end('Your files uploaded.');
  } catch (err) {
    console.log('err', err);
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
      return;
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == 'ExtensionError') {
        res.status(413).send({ error: { message: err.message } }).end();
      } else {
        res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
      }
      return;
    }
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/public/files/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + baseFolder;
  console.log('directoryPath', directoryPath);

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  home,
  upload,
  uploadMultiple,
  getListFiles,
  download,
};