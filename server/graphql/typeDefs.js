import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    test: String!
    users: [User!]!
  }
  type User {
    id: ID!
    name: String!
  }
  type Mutation {
    addUser(name: String!): User!
  }
`;