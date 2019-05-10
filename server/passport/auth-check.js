const jwt = require('jsonwebtoken');
const People = require('../model/people');
//const config = require('../../config');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  console.log("auth check api/ ")

  if (!req.query) {
    return res.status(401).end();
  }

  const token = req.query.token;

  // decode the token using a secret key-phrase
  return jwt.verify(token, "secret!!", (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    People.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      // pass user details onto next route
      //res.data = user; //JSON.stringify(user)
      return res.status(200).send({user: {
        name: user.name, 
        username: user.username, 
        auth: user.auth, 
        part: user.part
      }});
    });
  });
};
