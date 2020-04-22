import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import {
  AuthenticationError,
} from 'apollo-server';
import { typeDefs } from './src/typeDefs';
import { resolvers } from './src/resolvers';
import models from './src/models';

const app = express();

const { JWT_SECRET } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const { authorization: token = '' } = req.headers;

    let loggedIn = false;
    let user = null;
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return new AuthenticationError('Invalid Token');
        }
        loggedIn = true;
        user = { ...decoded };
        return decoded;
      });
    }

    return {
      req,
      res,
      models,
      loggedIn,
      user,
    };
  },
});

server.applyMiddleware({ app });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port: process.env.PORT }, () => {
  console.log(
    `App is listening on http://localhost:${process.env.PORT}${server.graphqlPath}`,
  );
});
