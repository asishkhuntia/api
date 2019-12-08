const mongoose = require('mongoose');

const User = mongoose.Schema({
  email: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true, trim: true},
  name: {type: String, default: '', trim: true},
  status: {type: String, default: 'p'}
});

module.exports = mongoose.model('User', User);
