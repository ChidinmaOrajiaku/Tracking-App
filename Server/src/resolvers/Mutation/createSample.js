import { samples } from '../sample';

export const createSample = async (_, { input }) => {
  const { id, name } = input;
  try {
    samples.push({ id, name });
    return samples;
  } catch (err) {
    console.log(err);
  }
};
