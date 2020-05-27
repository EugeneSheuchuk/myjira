const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskText: String,
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  position: Number,
  taskComment: String,
  createTime: String,
}, {autoIndex: false, versionKey: false});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;