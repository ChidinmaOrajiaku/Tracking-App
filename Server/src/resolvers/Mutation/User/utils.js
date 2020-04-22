import 'dotenv/config';
import jwt from 'jsonwebtoken';
import joi from '@hapi/joi';

const { JWT_SECRET } = process.env;

export const findExistingUser = async (user, email) => {
  const userData = await user.findOne({
    where: {
      email,
    },
  });

  return userData;
};

export const generateJWT = (id, email) => (
  jwt.sign({
    id,
    email,
    expiresIn: 60 * 60 * 72,
  }, JWT_SECRET)
);

export const userData = async (user) => {
  const {
    id,
    name,
    email,
    displayPicture,
  } = user;

  return {
    id,
    name,
    email,
    displayPicture,
    token: generateJWT(id, email),
  };
};

export const validateInput = (input, UserError) => {
  const schema = joi.object({
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required(),
  });
  const { error } = schema.validate(input);

  if (error) {
    throw new UserError(error.message, { details: error.details });
  }
};
