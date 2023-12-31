// index.js
// where your node app starts
require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


const buildResponse = (date) => {
  if (date instanceof Date && !isNaN(date)) {
    return {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  } else {
    return {error: "Invalid Date"};
  }
};


app.get("/api/:date", (req, res) => {

  const date = !isNaN(req.params.date) 
    ? new Date(Number(req.params.date)) 
    : new Date(req.params.date);

  res.json(buildResponse(date));
});

app.get("/api", (req, res) => {
  res.json(buildResponse(new Date()));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
