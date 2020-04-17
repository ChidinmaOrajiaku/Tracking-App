import { gql } from 'apollo-server-express';
import { sample } from './sample';
import { Mutation } from './Mutation';
import { Query } from './query';

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
  sample, // TODO: Delete sample
];
