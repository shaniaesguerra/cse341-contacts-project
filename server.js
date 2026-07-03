const express = require('express');
const mongodb = require('./data/db');

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});