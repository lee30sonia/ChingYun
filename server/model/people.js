var mongoose = require('mongoose');

// mongodb schema and model
var schema = mongoose.Schema({
   name: String, // 姓名
   username: String, // 登入ID
   password: String, // 登入密碼
   auth: String, // 入團授權碼 // 應可不用存？
   part: String, // SATB, teacher
   job: String,  // 幹部部門
   email: String,
   phone: String // 家電
   // to be added: nickname 顯示暱稱, inYear 進團年份, address 地址, cellphone 手機, birthday 生日, limit 權限（含休唱）
   // 學歷 工作 血型 ...?
   // connect with FB (FB user id)
});

var People = mongoose.model('People', schema);

module.exports = People
