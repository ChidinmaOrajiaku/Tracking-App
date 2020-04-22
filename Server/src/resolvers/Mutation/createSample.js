import {
  AuthenticationError,
} from 'apollo-server';
import { samples } from '../sample';

export const createSample = async (_, { input }, { loggedIn }) => {
  const { id, name } = input;
  if (!loggedIn) return new AuthenticationError('Please log in');

  samples.push({ id, name });
  return samples;
};
