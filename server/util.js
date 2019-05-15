const nodemailer = require('nodemailer');

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'chinyunchorous@gmail.com',
    pass: 'howcanikeepfromsinging'
  }
};

async function sendMail(args) {
  let mailOptions = {
    from: '"Ching Yun Robot" <chingyunchoir@gmail.com>',
    to: args.email+",chingyunchoir@gmail.com, joe101525@gmail.com",
    subject: '青韵線上購譜確認信', // Subject line
    text: args.str, // plain text body
    //html: '<b>Hello world?</b>' // html body
  };

  let transporter = await nodemailer.createTransport(smtpConfig);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return ("確認信寄送失敗。若此情況持續發生，請聯繫網頁工程師。錯誤訊息："+JSON.stringify(error));
    }
  });
  return("確認信已寄至您所提供的信箱（"+args.email+"）！若您未收到信，請務必再填一次表單，或 email 至 chingyunchoir@gmail.com");
}

async function sendMailForgetPass(args) {
  let mailOptions = {
    from: '"Ching Yun Robot" <chingyunchoir@gmail.com>',
    to: "chingyunchoir@gmail.com",
    subject: "團員專區忘記密碼（"+args.name+"）", // Subject line
    text: "麻煩幹部將以下資訊轉達給團員，並提醒他儘速以新密碼登入團員專區後點右上角自己的名字將密碼重設。\n\n團員姓名："+args.name+"\n帳號："+args.username+"\n新密碼："+args.newpass, // plain text body
    //html: '<b>Hello world?</b>' // html body
  };

  let transporter = await nodemailer.createTransport(smtpConfig);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return ("密碼變更信件寄送失敗。若此情況持續發生，請聯繫網頁工程師。錯誤訊息："+JSON.stringify(error));
    }
  });
  return("密碼變更信件已寄至幹部信箱！");
}

var util = {
  sendMail: sendMail,
  sendMailForgetPass: sendMailForgetPass
};

module.exports = util;
