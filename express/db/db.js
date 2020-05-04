const mongoose = require('mongoose');

module.exports = {
  connectDBOffline() {
    return mongoose.connect('mongodb://localhost:27017/myjira',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  },
  connectDBOnline() {
    return mongoose.connect('mongodb+srv://ToDoListUser:ToDoListUser@todolistproject-pjhmb.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  },

};