import { authenticateGoogle } from '../../../services/googleauth';
import {
  findExistingUser,
  userData,
} from './utils';

export const googleAuth = async (
  _,
  { input: { accessToken } },
  {
    req,
    res,
    models: { User },
  }) => {
  req.body = {
    ...req.body,
    access_token: accessToken,
  };

  const { data, info } = await authenticateGoogle(req, res);

  if (data) {
    const {
      profile: {
        _json: {
          email: userEmail,
          name: username,
          picture,
          given_name: givenName,
          family_name: familyName,
        },
      },
    } = data;

    const user = await findExistingUser(User, userEmail);

    if (!user) {
      const newUser = await User.create({
        name: username || `${givenName} ${familyName}`,
        email: userEmail,
        displayPicture: picture,
      });

      return userData(newUser);
    }

    return userData(user);
  }

  if (info) {
    console.log(info);
    switch (info.code) {
      case 'ETIMEDOUT':
        return (new Error('Failed to reach Google: Try Again'));
      default:
        return (new Error('Something went wrong'));
    }
  }

  return (new Error('No response'));
};
