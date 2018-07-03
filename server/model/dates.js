var mongoose = require('mongoose');

var schema = mongoose.Schema({
   name: String,
   dates: [Date]
});

var Dates = mongoose.model('Dates', schema);

module.exports = Dates;
