const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('route');
const data = require('./routes/data');
let pets

app.set('view engine', 'ejs');

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(data, function(req, res, next){
  console.log(res);
});

app.get('/', function(req, res, next) {
  res.status(200);
  // res.render('pages/pets.ejs')
  console.log(data.pets);
  res.send(data.pets)

})

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app
