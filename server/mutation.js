const People = require("./model/people");

async function addNewAgent(name, username, password, auth, part) {

   var newAgent = new People({ 
      name: name, 
      username: username, 
      password: password,
      auth: auth,
      part: part
   });
   await newAgent.save(function (err) {
       if (err) return handleError(err);
       // saved!
       console.log('new user registered', username)
   });
}

async function Signup(args) {
   console.log('signup request', args.username);
   var result;
   await People.findOne({ username: args.username })
      .exec()
      .then( match => {
         if(match) {
            result = false;
         }
         else {
            addNewAgent("未命名", args.username, args.password, args.auth, args.part);
            result = true;
         }
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
}

async function Update(args) {
}

async function AuthUpdate(args) {
}


var mutation = {
   Signup: Signup,
   Update: Update,
   AuthUpdate: AuthUpdate
};

module.exports = mutation;
