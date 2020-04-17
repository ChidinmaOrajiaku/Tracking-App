import express from 'express';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './src/typeDefs';
import { resolvers } from './src/resolvers';
import models from './src/models';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server.applyMiddleware({ app });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port: process.env.PORT }, () => {
  console.log(
    `App is listening on http://localhost:${process.env.PORT}${server.graphqlPath}`,
  );
});
