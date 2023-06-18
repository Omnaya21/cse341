const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  //.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))  
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true}))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST. PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

  /*
app
  .get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');    
  });
  /*.post('/contacts', (req, res) => {
    console.log(req.body);
  });*/

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to database and listening on port ${port}`);
  }
});