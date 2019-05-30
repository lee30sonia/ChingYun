const People = require('./model/people');
const Admission = require('./model/admission');
const Role = require('./model/role')
const Dates = require("./model/dates");
const Post = require('./model/post');

const passport = require('passport');
const axios = require('axios');
const PasswordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const URL = "https://chingyun-server.now.sh";
//const URL = "http://localhost:4001";
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function checkSelf(token) // helper function
{
   var result;
   await jwt.verify(token, "secret!!", async function(err, decoded) {
      if (err) result = null;
      else await People.findById(decoded.sub, async function(userErr, user) {
         if (!userErr) result = user;
      });
   });
   return result;
}

async function Login(args) {
   //console.log('login request in query ', args);
   var result;

   await axios.post(URL+"/login?username="+args.username+"&password="+args.password, {})
   .then(function (response) {
      if (response.status==200)
      {
         //console.log(response.data);
         result = {
            match: true,
            person: response.data.user,
            token: response.data.token
         }; 
      }
      else
         result = { match: false };
   })
   .catch(function (error) {
      //console.log(error);
      result = { match: false };
   });
   //console.log("result: ", result)
   return result;
}

async function getAdmit(args) { // permission: no-login
   console.log('getAuth request', args.number);
   var result;
   await Admission.findOne(args)
      .exec()
      .then( match => {
         if(match) {
            result = {
               number: args.number,
               name: match.name,
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

async function getPerson(args) { // permission: loggedin, self
   var p = await checkSelf(args.token);
   return p;
}

async function getIDbyName(args) { // permission: no-login
   console.log('getIDbyName request', args.name);
   var result;
   await People.find({name: args.name})
      .exec()
      .then( matches => {
         result = matches;   
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
}

async function allPeople(args) { // permission: loggedin
   console.log('allPeople request');
   var p = await checkSelf(args.token);
   if (!p) return null;

   var result;
   await People.find()
      .exec()
      .then( people => {
         if(people) {
            result = people;
            // console.log(result);
         }
         else result = [];
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
}

var date_sort = function (date1, date2) {
   if (date1 > date2) return 1;
   if (date1 < date2) return -1;
      return 0;
};

async function getDates(args) { // permission???
   console.log('getDates request');
   var result;
   await Dates.findOne(args)
      .exec()
      .then( data => {
         if(data) {
            data.dates.sort(date_sort);
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

async function allPost(args) { // permission: logged-in
   console.log('allPost request');
   var p = await checkSelf(args.token);
   if (!p) return null;

   var result;
   await Post.find()
      .exec()
      .then( posts => {
         if(posts) {
            result = posts.map( async function(post) {
               await People.findOne({username: post.author})
                  .exec()
                  .then( match => {
                     post.author = match;
                     console.log(match);
                  })
                  .catch( err => {
                     console.error(err);
                  });
               return post;
            });
         }
      })
      .catch( err => {
         console.error(err);
      });
   return result;
}

var query = {
   Login: Login,
   getAdmit: getAdmit,
   getPerson: getPerson,
   getIDbyName: getIDbyName,
   allPeople: allPeople,
   getDates: getDates,
   allPost: allPost
}

module.exports = query;
