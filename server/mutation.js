const People = require("./model/people");
const Admission = require("./model/admission")
const Role = require("./model/role")
const Dates = require("./model/dates");
const Post = require('./model/post');

const PasswordHash = require('password-hash');
const jwt = require('jsonwebtoken');

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

// helper function, not accessible outside
async function addNewAgent(name, username, password, roles, part) {
   var newAgent = new People({ 
      name: name, 
      username: username, 
      password: password,
      roles: roles,
      part: part
   });
   await newAgent.save(function (err) {
       if (err) return handleError(err);
       // saved!
       console.log('new user registered', username)
   });
}

async function Signup(args) { // permission: no-login
   console.log('signup request', args.username);
   var result = false;
   await Admission.findOne({number: args.auth})
      .exec()
      .then( match => {
         if(match) {
            var roleID = 0; // to be modified
            addNewAgent(match.name, args.username, args.password, [roleID], match.part);
            Admission.deleteOne({number: args.auth}).exec().catch( err => { console.error(err); });
            result = true;
         }
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
}

async function Update(args) { // permission: loggedin, self
   var p = await checkSelf(args.token);
   if (!p) return null;

   var result = true;
   await People.update( { username: p.username }, {
      name: args.name,
      nickname: args.nickname,
      email: args.email,
      phone: args.phone,
      cellphone: args.cellphone,
      address: args.address,
      birthday: args.birthday,
      inYear: args.inYear
   }, err => {
      console.log(err);
      result = false;
   });
   return result;
}

async function ChangePassword(args) { // permission: depends
   var result = false;
   var name = '';
   if (args.token)
   {
      var p = await checkSelf(args.token);
      if (p)
      {
         if (PasswordHash.verify(args.oldpass, p.password))
         {
            //console.log("match!")
            result = true;
            await People.updateOne( { username: p.username }, { password: args.newpass });  
         }
         else result = false;
      }
   }
   
   else if (args.username)
   {
      await People.findOneAndUpdate( { username: args.username }, { password: args.newpass })
         .exec()
         .then( function(match) {
            if (match)
            {
               result = true;
               name = match.name;
            }
            else 
               result = false;
         });
      
   }
   return { res: result, name: name };
}

async function newAdmission(args) { // permission: 招生 ???
   var result = false;
   var admit = new Admission( { number: args.number, name: args.name, part: args.part } );
   await Admission.findOne({number: args.number})
      .exec()
      .then( async function(match) {
         if(match)
            result = false;
         else
         {
            await admit.save()
               .then( p => {
                  result = true;
               })
               .catch( err => console.log(err) );
         }
      })

   return { res: result, name: '' };
}

async function addDate(args) { // permission ???
   var result;
   await Dates.findOne( {name: args.name} )
      .exec()
      .then( data => {
         if(data) {
            let d = data.dates;
            d.push(new Date(args.date));
            result = d.length;
            data.set( { dates: d } );
            data.save( err => {
               if(err)  return console.log(err);
               console.log(`date ${args.date} added`);
            });
         }
      })
      .catch( err => {
         console.error(err);
      });
   return result;
}

async function addPost(args) { // permission: loggedin
   var p = await checkSelf(args.token);
   if (!p) return null;

   var result = 1;
   var newPost = new Post({
      title: args.title,
      author: args.author,
      date: new Date(),
      content: args.content
   });
   await newPost.save()
      .then( p => {
         console.log('new post added');
         result = p._id;
      })
      .catch( err => console.log(err) );
   return result;
}

function Response(a, d, t) {
   return {
      author: a,
      date: d,
      text: t
   };
};

async function addResponse(args) { // permission: loggedin
   var p = await checkSelf(args.token);
   if (!p) return null;
   
   var result;
   await Post.findById(args.id)
      .exec()
      .then( data => {
         if(data) {
            let res = data.response;
            res.push(new Response(args.author, args.date, args.text));
            data.set( { response: res } );
            data.save()
               .then( () => {
                  console.log(`response added`);
                  result = true;
               })
               .catch( err => {
                  result = false;
                  return console.log(err);
               });
         }
      })
      .catch( err => {
         result = false;
         console.error(err);
      });
   return result;
}

var mutation = {
   Signup: Signup,
   Update: Update,
   ChangePassword: ChangePassword,
   newAdmission: newAdmission,
   addDate: addDate,
   addPost: addPost,
   addResponse: addResponse
};

module.exports = mutation;
