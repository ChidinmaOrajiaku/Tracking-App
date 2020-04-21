import { gql } from 'apollo-server-express';
import { sample } from './sample';
import { Mutation } from './Mutation';
import { Query } from './Query';
import { user } from './user';

const rootTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export const typeDefs = [
  rootTypeDefs,
  Mutation,
  Query,
  user,
  sample, // TODO: Delete sample
];
