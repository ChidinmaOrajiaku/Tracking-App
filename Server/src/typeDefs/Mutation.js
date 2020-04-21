import { gql } from 'apollo-server-express';

export const Mutation = gql`
  extend type Mutation {
    createSample(input: CreateSample): [Samples]
    signUp(input: UserInput ): User
    login(input: UserInput ): User
    googleAuth(input: GoogleUserInput): User
  }
`;
