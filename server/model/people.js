var mongoose = require('mongoose');

// mongodb schema and model
var schema = mongoose.Schema({
   name: String,
   username: String,
   password: String,
   auth: String,
   part: String,
   email: String,
   phone: String
});

schema.method.update = function(newData) {
   this.name = newData.name;
   this.email = newData.email;
   this.phone = newData.phone;
}

schema.method.AuthUpdate = function(newData) {
   this.auth = newData.auth;
   this.part = newData.part;
}

var People = mongoose.model('People', schema);

module.exports = People
