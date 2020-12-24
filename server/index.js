import { ApolloServer, gql,makeExecutableSchema } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { permissions } from "./graphql/permissions";
import { buildSchema } from "graphql";
const { applyMiddleware } = require("graphql-middleware");
import AuthMiddleware from "./middlewares/Auth.middleware"

import rootScema from "./models/rootScema"

const startServer = async () => {
  const app = express();

  app.use(AuthMiddleware)

  const sch = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  const server = new ApolloServer(
    {
      schema:applyMiddleware(rootScema,
        permissions
      ),
      context:({req})=>{
        const user = req.user ? req.user : null
        return user
      }
    }
  )

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:8080/db_flatja", {
    useNewUrlParser: true
  });


  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();