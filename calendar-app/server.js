const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.post('/selected/date', (req, res) => {
    res.send({"message": "selected date is:"+req.body.selDate});
});
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
