const People = require('./model/people');
const AuthNum = require('./model/authNum');

async function Login(args) {
   console.log('login request', args.username);
   var result;
   await People.findOne(args)
      .exec()
      .then( match => {
         if(match) {
            result = {
               match: true,
               person: match
            };
            // console.log(result);
         }
         else {
            result = {
               match: false
            };
         }
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
}

async function getAuth(args) {
   console.log('getAuth request', args.number);
   var result;
   await AuthNum.findOne(args)
      .exec()
      .then( match => {
         if(match) {
            result = {
               number: args.number,
               auth: match.auth,
               part: match.part
            };
            // console.log(result);
         }
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
}

var query = {
   Login: Login,
   getAuth: getAuth
}

module.exports = query;
