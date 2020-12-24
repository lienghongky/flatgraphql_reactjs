import {rule,shield,allow} from "graphql-shield"
import UserTC from "../models/UserTC"
const isAuthenticated = rule({
    fragment: 'fragment UserID on User { id }',
})((parent, args, {user}) => {
console.log(user)
  return user !== null;
});

const permissions = shield({
  Query: {
    test: isAuthenticated,
    users: isAuthenticated
  },
  Mutation:{
      login:true
  }

});

module.exports = { permissions };