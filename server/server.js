const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");

const port = 4001;
const app = express();
const server = require('http').createServer(app);
const axios = require('axios');

const People = require('./model/people');
const AuthNum = require('./model/authNum');
const Dates = require('./model/dates');
const Post = require('./model/post');
const query = require('./query');
const mutation = require('./mutation');
const util = require('./util');

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:AA123456@ds121871.mlab.com:21871/chingyuntest', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected');
});

// graphql schema
var schema = buildSchema(`

   type AuthNum {
      number: String,
      auth: String,
      part: String
   }

   type Match {
      match: Boolean,
      person: Person,
      token: String
   }

   type Person {
      name: String,
      username: String,
      password: String,
      auth: String,
      part: String,
      job: String,
      email: String,
      phone: String
   }

   type Dates {
      name: String,
      dates: [String]
   }

   type Post {
      title: String,
      author: Person,
      date: String,
      content: String,
      response: [Response]
   }

   type Response {
      author: Person,
      date: String,
      text: String
   }

   type Result {
      res: Boolean,
      name: String
   }

   type Query {
      checkPass(username: String!, password: String!): Match,
      login(username: String!, password: String!): Match,
      getAuth(number: String!): AuthNum,
      getPerson(username: String!): Person,
      getIDbyName(name: String!): [Person],
      allPeople: [Person],
      getDates(name: String!): [String],
      allPost: [Post],
      sendMail(email: String!, str: String!): String,
      sendMailForgetPass(name: String!, username: String!, newpass: String!): String
   }

   type Mutation {
      signup(name: String, username: String!, password: String!, auth: String, part: String): Boolean,
      update(username: String!, name: String, email: String, phone: String): Boolean,
      changePassword(username: String!, oldpass: String, newpass: String!): Result,
      authUpdate(username: String!, auth: String, part: String, job: String): Boolean,
      addDate(name: String!, date: String!): Int,
      addPost(title: String, author: String, date: String, content: String): String,
      addResponse(id: String, author: String, date: String, text: String): Boolean
   }
`);

const resolver = {
   checkPass: query.checkPass,
   login: query.Login,
   getAuth: query.getAuth,
   getPerson: query.getPerson,
   getIDbyName: query.getIDbyName,
   allPeople: query.allPeople,
   getDates: query.getDates,
   allPost: query.allPost,
   signup: mutation.Signup,
   update: mutation.Update,
   changePassword: mutation.ChangePassword,
   authUpdate: mutation.authUpdate,
   addDate: mutation.addDate,
   addPost: mutation.addPost,
   addResponse: mutation.addResponse,
   sendMail: util.sendMail,
   sendMailForgetPass: util.sendMailForgetPass
};

app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});

app.use("/graphql", express_graphql({
   schema: schema,
   rootValue: resolver,
   graphiql: true
}));


// pass the passport middleware
app.use(passport.initialize());
// load passport strategies
const localLoginStrategy = require('./passport/local-login');
passport.use('local-login', localLoginStrategy);

app.post(
   '/login',
   passport.authenticate('local-login', { session: false }),
   function (req, res) {
      res.send({user: req.authInfo, token: req.user});
   }
);


// pass the authenticaion checker middleware
const authCheckMiddleware = require('./passport/auth-check');
app.post(
   '/api', 
   authCheckMiddleware
);


// session
app.use(session({ 
   secret: "cats",
   resave: false,
   saveUninitialized: false, }));
app.use(passport.session());
passport.serializeUser(function(user, done) {
   console.log("serialize")
   done(null, user);
});

passport.deserializeUser(function(id, done) {
   console.log("deserialize: ", id)
   //axios.get("http://localhost:4001/api");
  People.findById(id, function(err, user) {
    done(err, user);
  });
});

server.listen(port, () => console.log(`Listening on localhost:${port}/graphql`))
