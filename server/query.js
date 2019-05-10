const People = require('./model/people');
const AuthNum = require('./model/authNum');
const Dates = require("./model/dates");
const Post = require('./model/post');
const passport = require('passport');
const axios = require('axios');
const URL = "https://chingyun-server.now.sh";
//const URL = "http://localhost:4001";
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
      console.log(error);
      result = { match: false };
   });

/*   await People.findOne(args)
      .exec()
      .then( async function(match) {
         if(match) {
            result = {
               match: true,
               person: match
            };

            // create an AJAX request
            params = "username="+result.person.username+"&password="+result.person.password;
            const xhr = new XMLHttpRequest();
            xhr.open('post', 'http://localhost:4001/auth/login?'+params);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            //xhr.setRequestHeader("Content-length", params.length);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
               //console.log("xhr: ",xhr)
               if (xhr.status === 200) {
                  // success
                  
                  // save the token
                  //authenticateUser(JSON.parse(xhr.responseText).token);
                  result = {
                     match: true,
                     person: match,
                     token: JSON.parse(xhr.responseText).token
                  };
                  return result;
                  // update authenticated state
                  //this.props.toggleAuthenticateStatus()
               
                  // redirect signed in user to dashboard
                  //this.props.history.push('/dashboard');
               } 
               else {
                  // failure
                  //console.log("fail, xhr: ", xhr)
               }
            });
            xhr.send(null)
            //xhr.send(`username=${result.person.username}&password=${result.person.password}`);
         }
         else {
            result = {
               match: false
            };
            return result;
         }
      })
      .catch( err => {
         console.error(err);
      });
*/
   //console.log("result: ", result)
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

async function getPerson(args) {
   console.log('getPerson request', args.username);
   var result;
   await People.findOne({username: args.username})
      .exec()
      .then( match => {
         if(match) {
            result = match;
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

var date_sort = function (date1, date2) {
   if (date1 > date2) return 1;
   if (date1 < date2) return -1;
      return 0;
};

async function getDates(args) {
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

async function allPost() {
   console.log('allPost request');
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
   getAuth: getAuth,
   getPerson: getPerson,
   allPeople: allPeople,
   getDates: getDates,
   allPost: allPost
}

module.exports = query;
