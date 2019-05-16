const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const People = require('../model/people');
const PasswordHash = require('password-hash');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {

  People.findOne({username: username.trim()}, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      const error = new Error('Incorrect username');
      error.name = 'IncorrectCredentialsError';

      return done(null, false);
    }

    if (PasswordHash.verify(password, user.password))
    {
      const payload = {
        sub: user._id
      };
      // create a token string
      const token = jwt.sign(payload, "secret!!");
      return done(null, token, user);
    }
    else
    {
      const error = new Error('Incorrect password');
      error.name = 'IncorrectCredentialsError';

      return done(null, false);
    }
    
  });
/*
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
*/
});
