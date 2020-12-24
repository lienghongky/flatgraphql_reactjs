import {rule,shield} from "graphql-shield"
const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield({
  Query: {
    viewer: isAuthenticated
  }
});

module.exports = { permissions };