var mongoose = require('mongoose');

// mongodb schema and model
var peopleSchema = mongoose.Schema({
   name: String,
   username: String,
   password: String
});
var People = mongoose.model('People', peopleSchema);

module.exports = People
