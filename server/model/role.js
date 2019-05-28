var mongoose = require('mongoose');

var Role = mongoose.model('Role', mongoose.Schema({
   _id: Number
}));

var Permission = mongoose.model('Permission', mongoose.Schema({
   
}));

module.exports = Role;
