const People = require('./model/people');
const AuthNum = require('./model/authNum');
const Dates = require("./model/dates");

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

async function allPeople() {
   console.log('allPeople request');
   var result;
   await People.find()
      .exec()
      .then( people => {
         if(people) {
            result = people;
            // console.log(result);
         }
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
}

async function getDates(args) {
   console.log('getDates request');
   var result;
   await Dates.findOne(args)
      .exec()
      .then( data => {
         if(data) {
            data.dates.sort();
            result = data.dates.map( d => {
               return (d.getMonth()+1) + "/" + d.getDate() });
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
   getAuth: getAuth,
   allPeople: allPeople,
   getDates: getDates
}

module.exports = query;
