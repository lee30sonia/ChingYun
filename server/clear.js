/*************************************
 * This is for cleaning the data base
 ************************************/

const People = require('./model/people');
const AuthNum = require('./model/authNum');
const Dates = require('./model/dates');

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:AA123456@ds121871.mlab.com:21871/chingyuntest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected');

   // clean previous data
   People.deleteMany({}, function (err) {
       if (err) return handleError(err);
      console.log('People: previous data cleared');
       // deleted at most one tank document
   })
   .then( () => {

      // create an admin
      var admin = new People({ 
         name: 'Admin', 
         username: 'admin', 
         password: 'password',
         auth: 'Root',
         part: 'Teacher'
      });
      admin.save(function (err) {
          if (err) return handleError(err);
          // saved!
          console.log('People: admin saved')
          //console.log(admin);
      });
   });

   AuthNum.deleteMany({}, function (err) {
       if (err) return handleError(err);
      console.log('AuthNum: previous data cleared');
   })
      .then( () => {

         var numbers = [
            {
               number: "abc", auth: "Root", part: "Sope2"
            },
            {
               number: "def", auth: "Teacher", part: "Teacher"
            },
            {
               number: "ghi", auth: "Leader", part: "Tenor1"
            }
         ];
         for(let num of numbers) {
            let auth = new AuthNum(num);
            auth.save(function (err) {
                if (err) return handleError(err);
            });
         }
         console.log("AuthNum: numbers saved");
      });

   Dates.deleteMany({}, function (err) {
       if (err) return handleError(err);
      console.log('Dates: previous data cleared');
   })
   .then( () => {
      var preset = ["2018-06-02", "2018-06-09", "2018-06-16", "2018-06-23"];
      var date = new Dates({ 
         name: "attend",
         dates: preset.map( d => new Date(d) )
      });
      date.save(function (err) {
          if (err) return handleError(err);
          console.log('Dates: attend saved')
      });
   });
});

