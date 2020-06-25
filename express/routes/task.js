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
    const { taskId, boardId, position } = req.body;
    const result = await mongodb.deleteTask(taskId, boardId, position);
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
router.put('/move', async (req, res) => {
  try {
    const { startBoardId, endBoardId, taskId, oldPosition, newPosition } = req.body;
    const result = await mongodb.moveTaskByDnD(startBoardId, endBoardId, taskId, oldPosition, newPosition);
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {

  }
});
router.put('/', async (req, res) => {
  try {
    const { taskId, taskData } = req.body;
    const result = await mongodb.changeTaskData(taskId, taskData);
    if (result) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {

  }
});

module.exports = router;
