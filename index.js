var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const errorHandler = (res, e, next) => {
  console.error(e);
  res.json({error: e.message});
  next();
}

const uploadFileController = async (req, res, next)=>{
  try {
    const name = req.file.originalname;
    const size = req.file.size;
    const type = req.file.mimetype;

    res.json({
      "name":name,"type":type,"size":size
    });
    next();
  } catch (error) {
    errorHandler(res, error, next);
  }
}

//server setup
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//POST
app.post('/api/fileanalyse', upload.single('upfile'), uploadFileController);


//Listener
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
