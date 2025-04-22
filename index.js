// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  if (dateParam && Number.isInteger(+dateParam)) {
    // If dateParam is a number, treat it as a Unix timestamp
    const unix = parseInt(dateParam, 10);
    const date = new Date(unix);
    const utc = date.toUTCString();
    return res.json({ unix, utc });
  } else {
    // If dateParam is not a number, treat it as a date string
    const date = dateParam ? new Date(dateParam) : new Date();
    const isValidDate = !isNaN(date.getTime());
    if (isValidDate) {
      const unix = date.getTime();
      const utc = date.toUTCString();
      return res.json({ unix, utc });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
