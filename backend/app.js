const http = require('http');
const fs = require('fs');
const formidable = require('formidable'); // you will need to install this module via npm

const server = http.createServer((req, res) => {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    // create a new form object
    const form = new formidable.IncomingForm();

    // specify the directory where uploaded files will be saved
    form.uploadDir = './uploads';

    // parse the request and handle file uploads
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Error uploading file');
        return;
      }

      // get the temporary path of the uploaded file
      const tempPath = files.file.path;

      // generate a new filename
      const fileName = Date.now() + '_' + files.file.name;

      // move the file to the specified directory with the new filename
      fs.rename(tempPath, form.uploadDir + '/' + fileName, err => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Error uploading file');
          return;
        }

        // file upload successful
        res.statusCode = 200;
        res.end('File uploaded successfully');
      });
    });

    // prevent the default form submission behavior
    return;
  }

  // handle other requests
  res.statusCode = 404;
  res.end('Not found');
});

// start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
