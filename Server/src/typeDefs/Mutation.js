import { gql } from 'apollo-server-express';

export const Mutation = gql`
  extend type Mutation {
    createSample(input: CreateSample): [Samples]
  }
`;
