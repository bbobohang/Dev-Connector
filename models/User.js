//Models are to be named with upper case
//Models are template that you want resource to have
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/*Same as below code
User = mongoose.model('user', UserSchema)
modules.export = User*/
//To access => User.User (?)
module.exports = mongoose.model('user', UserSchema);
