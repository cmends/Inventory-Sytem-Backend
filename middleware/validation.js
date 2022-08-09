import Joi from "joi";

export const userSignUpSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  shopName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const productSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.string().required(),
  price: Joi.string().required(),
  status: Joi.string().required(),
  category: Joi.string().required(),
});
