import {
  UserInputError,
  AuthenticationError,
} from 'apollo-server';
import bcrypt from 'bcrypt';
import {
  findExistingUser,
  userData,
  validateInput,
} from './utils';

export const signUp = async (_, { input }, { models: { User } }) => {
  validateInput(input, UserInputError);
  const { email: userEmail, password } = input;

  const user = await findExistingUser(User, userEmail);

  if (user) {
    throw new AuthenticationError('User already exists');
  }

  const salt = bcrypt.genSaltSync(9);

  const newUser = await User.create({
    email: userEmail,
    password: bcrypt.hashSync(password, salt),
  });

  if (bcrypt.compareSync(password, newUser.password)) {
    return userData(newUser);
  }
  throw new Error('Server error');
};
