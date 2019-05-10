import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

// connect to the server
const client = new ApolloClient({
   //uri: "https://chingyun.now.sh/graphql"
   uri: "https://chingyun-server.now.sh/graphql"
   //uri: "http://localhost:4001/graphql"
});

// this is for testing if client is working
/* client.query({
    query: gql`
      query login($u: String!, $p: String!) {
       login(username: $u, password: $p) {
         match
         person {
            name
         }
      }
   }`,
   variables: {
      "u": "admin",
      "p": "password"
   }
 })
   .then( data => {
      console.log(data);
   })
    .catch( err => {
       console.log(err);
    });
*/

export default client
