const express = require('express');
const path = require('path');
const mongodb = require('./db/db');

const app = express();
let port = process.env.PORT;
if (port == null || port == '') {
    port = 8000;
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.resolve(__dirname, './../build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../build/index.html'));
});

mongodb.connectDBOffline()
  .then(res => {
      if (res.connection.readyState !== 0) {
          app.listen(port, () => console.log(`Server listening port - ${port}`));
          return;
      }
      console.log('Fail to connect to database');
  })
  .catch(err => {
      console.log('err ', err);
      console.log('mongoDB was not connect ', err);
  });

