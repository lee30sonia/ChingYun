var mongoose = require('mongoose');

var People = mongoose.model('People', mongoose.Schema({
   name: String, // 姓名
   nickname: String, // 顯示暱稱
   username: String, // 登入ID
   password: String, // 登入密碼(hashed)
   email: String,
   phone: String, // 家電
   cellphone: String, // 手機
   address: String, // 地址
   birthday: Date, // 生日
   inYear: Number, // 進團年份
   // 學歷 工作 血型 ...?
   // connect with FB (FB user id)
   roles: [Number], // _id in Role schema
   //auth: String, // 入團授權碼 // 應可不用存？
   part: String // SATB, teacher
   //job: String,  // 幹部部門
}));

module.exports = People;