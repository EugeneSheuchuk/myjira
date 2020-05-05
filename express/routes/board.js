const express = require('express');
const router = express.Router();
const mongodb = require('./../db/db');

router.use((req, res, next) => {
  console.log('Board route: ', Date.now());
  next();
});

router.get('/', async (req, res) => {
  try {
    const result = await mongodb.getBoards();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.post('/', async (req, res) => {
  try {
    const boardName = req.body.boardName;
    const response = mongodb.addBoard(boardName);
    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete('/', async (req, res) => {
  try {
    const boardId = req.body.boardId;
    const response = mongodb.deleteBoard(boardId);
    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.put('/', async (req, res) => {
  try {
    const { boardId, newBoardName } = req.body;
    const response = await mongodb.changeBoardName(boardId, newBoardName);
    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
