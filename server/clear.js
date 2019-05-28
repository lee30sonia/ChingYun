/*************************************
 * This is for cleaning the data base
 ************************************/

const People = require("./model/people");
const Admission = require("./model/admission");
const Role = require("./model/role")
const Dates = require("./model/dates");
const Post = require("./model/post");

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:AA123456@ds121871.mlab.com:21871/chingyuntest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('connected');

   // clean previous data
   Role.deleteMany({}, function (err) {
       if (err) return handleError(err);
      console.log('Role: previous data cleared');
   })
   .then( () => {
      var newRole = new Role({
        _id: 0
      });
      newRole.save(function (err) {
         if (err) return handleError(err);
         // saved!
      });
   });

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
         password: 'sha256$9df324b1$1$fbb10a73aab7ca6c9a57a52991e62c947b9eef7b4632431e68f1ea5c7b5a3c97', // "password"
         part: 'Teacher'
      });
      admin.save(function (err) {
         if (err) return handleError(err);
         // saved!
         console.log('People: admin saved')
         //console.log(admin);
      });
   });

   Admission.deleteMany({}, function (err) {
      if (err) return handleError(err);
      console.log('Admission: previous data cleared');
   })
   .then( () => {
      var numbers = [
         {
            number: "abc", name: "王小美", part: "Sop2"
         }
      ];
      for(let num of numbers) {
         let admit = new Admission(num);
         admit.save(function (err) {
             if (err) return handleError(err);
         });
      }
      console.log("Admission: numbers saved");
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

   Post.deleteMany({}, function (err) {
       if (err) return handleError(err);
      console.log('Post: previous data cleared');
   })
});

