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

   type Query {
      login(username: String!, password: String!): Match,
      getAuth(number: String!): AuthNum,
      allPeople: [Person],
      getDates(name: String!): [String]
   }

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

   type Mutation {
      signup(username: String!, password: String!, auth: String, part: String): Boolean,
      update(name: String, email: String, phone: String): Boolean,
      authUpdate(auth: String, part: String, job: String): Boolean,
      addDate(name: String!, date: String!): Int
   }
`);

const resolver = {
   login: query.Login,
   getAuth: query.getAuth,
   allPeople: query.allPeople,
   getDates: query.getDates,
   signup: mutation.Signup,
   update: mutation.Update,
   authUpdate: mutation.authUpdate,
   addDate: mutation.addDate
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
