var mongoose = require('mongoose');

// mongodb schema and model
var schema = mongoose.Schema({
   name: String,
   username: String,
   password: String,
   auth: String,
   part: String,
   job: String,
   email: String,
   phone: String
});

var People = mongoose.model('People', schema);

module.exports = People
