const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const port = 4001;
const app = express();
const server = require('http').createServer(app);

const People = require('./model/people');
const AuthNum = require('./model/authNum');
const Dates = require('./model/dates');
const Post = require('./model/post');
const query = require('./query');
const mutation = require('./mutation');

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:AA123456@ds121871.mlab.com:21871/chingyuntest');
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
      person: Person
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

   type Query {
      login(username: String!, password: String!): Match,
      getAuth(number: String!): AuthNum,
      getPerson(username: String!): Person,
      allPeople: [Person],
      getDates(name: String!): [String],
      allPost: [Post]
   }

   type Mutation {
      signup(name: String, username: String!, password: String!, auth: String, part: String): Boolean,
      update(username: String!, name: String, email: String, phone: String): Boolean,
      authUpdate(username: String!, auth: String, part: String, job: String): Boolean,
      addDate(name: String!, date: String!): Int,
      addPost(title: String, author: String, date: String, content: String): String,
      addResponse(id: String, author: String, date: String, text: String): Boolean
   }
`);

const resolver = {
   login: query.Login,
   getAuth: query.getAuth,
   getPerson: query.getPerson,
   allPeople: query.allPeople,
   getDates: query.getDates,
   allPost: query.allPost,
   signup: mutation.Signup,
   update: mutation.Update,
   authUpdate: mutation.authUpdate,
   addDate: mutation.addDate,
   addPost: mutation.addPost,
   addResponse: mutation.addResponse
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

server.listen(port, () => console.log(`Listening on localhost:${port}/graphql`))
