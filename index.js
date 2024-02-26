var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile') ,(req, res) => {
  const originalname = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
  res.json({name: originalname, type: req.file.mimetype, size: req.file.size });
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
