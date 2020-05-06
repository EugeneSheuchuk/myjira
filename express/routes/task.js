const express = require('express');
const router = express.Router();
const mongodb = require('./../db/db');

router.use((req, res, next) => {
  console.log('Task route: ', Date.now());
  next();
});

router.post('/', async (req, res) => {
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
router.delete('/', async (req, res) => {
  try {
    const taskId = req.body.taskId;
    const result = await mongodb.deleteTask(taskId);
    res.send(result);
  } catch (e) {

  }
});
router.put('/sort', async (req, res) => {
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

module.exports = router;
