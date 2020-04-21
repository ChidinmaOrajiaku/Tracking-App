import {
  UserInputError,
  AuthenticationError,
} from 'apollo-server';
import bcrypt from 'bcrypt';
import {
  userData,
  validateInput,
} from './utils';

export const login = async (_, { input }, { models: { User } }) => {
  validateInput(input, UserInputError);
  const { email, password } = input;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    throw new AuthenticationError('User does not exist');
  }

  if (bcrypt.compareSync(password, user.password)) {
    return userData(user);
  }

  throw new AuthenticationError('Incorrect login details');
};
