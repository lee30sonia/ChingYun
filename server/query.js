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

async function getAttendDates() {
   console.log('getAttendDates request');
   var result;
   await Dates.find("attend")
      .exec()
      .then( data => {
         if(data) {
            result = data.dates.map( d => (d.getMonth()+1) + "/" + d.getDay() );
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
   allPeople: allPeople
}

module.exports = query;
