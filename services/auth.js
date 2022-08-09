import bcrypt from "bcrypt";

export const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return { salt, hash };
};

export const comparePassword = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};
