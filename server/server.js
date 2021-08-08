import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cors from "cors";

import {typeDefs} from './schema.js';
import {resolvers} from './resolvers.js';

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers  });
  await server.start();
  const app = express();
  var corsOptions = {
    origin: '*',
  };
  app.use(cors(corsOptions));
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: 5000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}




startApolloServer(typeDefs, resolvers)