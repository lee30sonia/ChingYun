const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
//const config = require('../../config');
const People = require('../model/people');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const userData = {
    username: username.trim(),
    password: password.trim()
  };

  return People.findOne(userData, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect username or password');
      error.name = 'IncorrectCredentialsError';

      return done(null, false);
    }

    const payload = {
      sub: user._id
    };
    // create a token string
    const token = jwt.sign(payload, "secret!!");
    //console.log(token);

    return done(null, token, user);
  });
});
