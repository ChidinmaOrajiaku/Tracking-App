import { gql } from 'apollo-server-express';

export const user = gql`
  type User {
    id: String
    name: String
    email: String
    token: String
    displayPicture: String
  }

  input UserInput {
    name: String
    email: String!
    password: String!
    displayPicture: String
  }

  input GoogleUserInput {
    accessToken: String!
  }
`;
