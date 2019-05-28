var mongoose = require('mongoose');

var Admission = mongoose.model('Admission', mongoose.Schema({
   number: String, // 授權碼
   name: String, // 新生姓名
   part: String // 錄取聲部
}));

module.exports = Admission;