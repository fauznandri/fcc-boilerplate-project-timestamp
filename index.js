// index.js
// where your node app starts

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


// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;
  let date;

  // Case 1: If the date parameter is empty, use the current time.
  if (!dateString) {
    date = new Date();
  } else {
    // Case 2: Check if the input is a string of digits (potential Unix timestamp).
    if (/^\d+$/.test(dateString)) {
      // Parse the string as an integer. The Date constructor handles numeric timestamps.
      date = new Date(parseInt(dateString));
    } else {
      // Case 3: The input is a standard date string.
      date = new Date(dateString);
    }
  }

  // Validate the resulting Date object.
  // An invalid date will have a time value of NaN (Not-a-Number).
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
