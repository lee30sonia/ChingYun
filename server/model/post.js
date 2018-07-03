var mongoose = require("mongoose");

var response = {
   author: String,
   date: Date,
   text: String
};
var schema = mongoose.Schema({
   title: String,
   author: String, // username
   date: Date,
   content: String,
   response: [response]
});

var Post = mongoose.model('Post', schema);

module.exports = Post;
