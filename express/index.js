const express = require('express');
const cors = require('cors');
const path = require('path');
const mongodb = require('./db/db');
const boards = require('./routes/board');

const app = express();
let port = process.env.PORT;
if ( port == null || port == '' ) {
  port = 8000;
}


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.resolve(__dirname, './../build')));
app.use('/boards', boards);

app.post('/tasks/', async (req, res) => {
  try {
    const { taskText, boardId } = req.body;
    if ( taskText.trim() === '' ) {
      res.send(false);
      return;
    }
    const result = await mongodb.addNewTask(boardId, taskText.trim());
    res.send(result);
  } catch (e) {

  }
});
app.delete('/tasks/', async (req, res) => {
  try {
    const taskId = req.body.taskId;
    const result = await mongodb.deleteTask(taskId);
    res.send(result);
  } catch (e) {

  }
});
app.put('/tasks/sort', async (req, res) => {
  try {
    const { boardId, taskId, direction, position } = req.body;
    const result = await mongodb.sortBoardTasks(boardId, taskId, direction, position);
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {

  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../build/index.html'));
});

mongodb.connectDBOffline()
  .then(res => {
    if ( res.connection.readyState !== 0 ) {
      app.listen(port, () => console.log(`Server listening port - ${port}`));
      return;
    }
    console.log('Fail to connect to database');
  })
  .catch(err => {
    console.log('err ', err);
    console.log('mongoDB was not connect ', err);
  });

