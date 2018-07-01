const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const port = 4001;
const app = express();
const server = require('http').createServer(app);
const People = require('./people');
// const io = require('socket.io')(server);

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:AA123456@ds121871.mlab.com:21871/chingyuntest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected');
});

// clean previous data
People.deleteMany({}, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
});

// create an admin
var pw = 'password';
var admin = new People({ name: 'Admin', username: 'admin', password: pw });
admin.save(function (err) {
    if (err) return handleError(err);
    // saved!
    console.log('admin saved')
    //console.log(admin);
});

// graphql schema
var schema = buildSchema(`

   type Query {
      login(username: String!, password: String!): Match
   }
   
   type Match {
      match: Boolean,
      person: Person
   }

   type Person {
      name: String,
      username: String,
      password: String
   }
`);

var Login = async function(args) {
   console.log('login request')
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
         else result = {
            match: false
         };
      })
      .catch( err => {
         console.error(err);
      });
   // console.log(result);
   return result;
};

const resolver = {
   login: Login
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

// the socketIO version
/*
io.on('connection', socket => {
    console.log('New client connected: ', socket.client.id)
    var key = socket.client.id

    socket.on('login request', (obj) => {
        console.log('login request')
        People.findOne(obj, (err, match) => {
            if (err) return console.error(err);
            //console.log(matches);
            if (match)
                io.sockets.emit('login success', match);
            else
                io.sockets.emit('login failed');
        })
    })
  
    /*socket.on('login', (name) => {
        console.log('New user logged in: ', name)
        users[key] = { key: key, name: name }
        io.sockets.emit('new user', {user: users[key], users: users})
    })

    socket.on('send', (obj) => {
        console.log(obj.from, ' sends ', obj.msg, ' to ', obj.to)
        io.sockets.emit('new msg', obj)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected: ', users[key])
        io.sockets.emit('user leave', users[key])
        delete users[key]
    })
})
*/

server.listen(port, () => console.log(`Listening on localhost:${port}/graphql`))
