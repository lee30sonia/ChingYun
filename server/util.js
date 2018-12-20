const nodemailer = require('nodemailer');

async function sendMail(args) {
  let mailOptions = {
    from: '"Ching Yun Robot" <chingyunchoir@gmail.com>',
    to: args.email+",chingyunchoir@gmail.com", //joe101525@gmail.com
    subject: '青韵線上購譜確認信', // Subject line
    text: args.str, // plain text body
    //html: '<b>Hello world?</b>' // html body
  };

  let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'chinyunchorous@gmail.com',
      pass: 'howcanikeepfromsinging'
    }
  };

  let transporter = await nodemailer.createTransport(smtpConfig);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return ("確認信寄送失敗。若此情況持續發生，請聯繫網頁工程師。錯誤訊息："+JSON.stringify(error));
    }
  });
  return("確認信已寄至您所提供的信箱（"+args.email+"）！");
}

var util = {
  sendMail: sendMail
};

module.exports = util;
