const { schemaComposer } = require('graphql-compose');
import {makeExecutableSchema } from "apollo-server"

import { resolvers } from "../graphql/resolvers"
import { typeDefs } from "../graphql/typeDefs"


import UserTC from "./UserTC"
import User from "./UserTC"

const resolversSDL = {
    Query: {
      test: async () => {
        const user = await UserTC.findOne({name:"Student1"})
        if(user)return JWTUtil.signToken(user) || "NOT FOUND"
        return "ERORR"
      },
      users: () => User.find()
    },
    Mutation: {
      addTest: async (_,{})=>{
        return "ok this is testing function"
      },
      addUser: async (_, { name }) => {
        const user = new User({ name });
        await user.save();
        return user;
      },
      login: async (req,{username,password}) => {
        const user = await User.findOne({name:username})
        if(!user){
          return Error("USER NAME PASSWORD IS INCORRECT")
        }
        const token = jwt.sign(
          {"user":user},
          "f1BtnWgD3VKY",
          { algorithm: "HS256", subject: "1", expiresIn: "1d" }
        );
        return "sadfasdf";
      }
    }
  };

const typeDefsSDL = `
type Query {
  test: String!
  users: [User!]!
  user: User!
}
type Mutation {
  addTest:String!
  addUser(name: String!): User!
  login(username:String!,password:String!):String!
}
`;

// const rootScema = makeExecutableSchema({
//     typeDefs:[typeDefs],
//     resolvers:{
//         Query:{...resolvers.Query},
//         Mutation:{...resolvers.Mutation,...UserTC.Mutation}
//     }
// })

schemaComposer.addTypeDefs(typeDefsSDL);
schemaComposer.addResolveMethods(resolvers);

const graphqlSchema = UserTC.buildSchema();
export default graphqlSchema