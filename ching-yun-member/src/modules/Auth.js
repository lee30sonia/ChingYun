const axios = require('axios');
class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */

  
  static authenticateUser(token) {
    console.log("authenticate")
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    console.log("authenticated?")


    axios.get("http://localhost:4001/api", { 'headers': { 'Authorization': 'Bearer '+ localStorage.getItem('token')} })
      .then(function (response) {
        console.log("auth check response: ",response.data);
      })
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    console.log("de-authenticate")
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
