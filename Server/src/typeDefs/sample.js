import { gql } from 'apollo-server-express';

export const sample = gql`
  type Samples {
    id: ID!
    name: String
  }

  input CreateSample {
    id: ID!
    name: String
  }
`;
