var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const multer = require('multer');


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage: storage });


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    // Check if file was provided
    if (!req.file) {
        return res.json({ error: 'No file uploaded' });
    }

      const { originalname, mimetype, size } = req.file;
      res.json({ name: originalname, type: mimetype, size: size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
