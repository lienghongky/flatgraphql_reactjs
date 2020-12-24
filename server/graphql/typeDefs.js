import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    test: String!
    users: [User!]!
    user: User!
  }
  type User {
    id: ID!
    name: String!
  }
  type Mutation {
    addTest:String!
    addUser(name: String!): User!
    login(username:String!,password:String!):String!
  }
`;