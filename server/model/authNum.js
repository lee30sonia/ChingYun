var mongoose = require('mongoose');

// mongodb schema and model
var schema = mongoose.Schema({
   number: String,
   auth: String,
   part: String
});
var AuthNum = mongoose.model('authNum', schema);

module.exports = AuthNum;

/*
   auth: Root, Teacher, Leader(part), Member, etc.
   part: Sope1, Alto2, ect
*/
