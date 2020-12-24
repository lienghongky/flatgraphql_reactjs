import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { permissions } from "./graphql/permissions";
import { buildSchema } from "graphql";

const startServer = async () => {
  const app = express();



  const server = new ApolloServer(
    {
      schema:applyMiddleware(
        buildSchema({
                    typeDefs,
                    resolvers
                  }),
        permissions
      ),
      context:({request})=>{
        const user = request.headers.user ? JSON.parse(request.headers.user) : null
        return {user}
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