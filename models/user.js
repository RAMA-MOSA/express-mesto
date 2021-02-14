const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar:{
    type: String,
    required: true,
    validate: {
      validator(v){
        return /https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=\S]*)/g.test(v);
      },
      message: 'Ошибка валидации.'
    }
  }
})

module.exports = mongoose.model('user', userSchema)