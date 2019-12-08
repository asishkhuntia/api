const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const DB = process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/api?gssapiServiceName=mongodb';


//cors
app.use(cors());
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://letsjoinme.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

// Body-parser for POST method: receive data
app.use(express.json()); //Data posted with JSON format
app.use(express.urlencoded({ extended: false })); //Handel direct form submission

//hitting home api url
app.get('/', (req, res) => {
  res.status(200)
    .json({"code": 200, "type": "string", "data": "live"});
});


/*app.use((req, res, next) => {
  //console.log(req);
  next();
});
*/



//Static / Manual Routers
// //single file
// app.get('/man/api/user', (req, res) => {
//   res.sendFile(path.join(__dirname, 'man/api/user.html'));
// });
// Static folder
app.use(express.static(path.join(__dirname)))

//Api Router
app.use('/api/user', require('./src/routes/user'));
app.use('/api/todo', require('./src/routes/todo'));
app.use('/api/timetracker', require('./src/routes/time-tracker'));
app.use('/api/preference', require('./src/routes/preference'));

app.listen(PORT, (req, res) => {
  console.log('Running on ', PORT);
});
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
