import { productSchema } from "./validation.js";
import Products from "../models/Products.js";
import Users from "../models/Users.js";

export const getUserDetails = async () => {};

export const checkForProduct = async (req, res, next) => {
  const product = await Products.findById({ _id: req.params.id });

  if (!product) {
    return res.status(404).send({
      message: "Product not found",
      data: null,
    });
  }
  // req.product = product
  next();
};

export const checkForProductName = async (req, res, next) => {
  const product = await Products.find({ name: req.params.name });

  if (!product) {
    return res.status(404).send({
      message: "Product not found",
      data: null,
    });
  }
  req.product = product;
  next();
};

export const validateProduct = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error,
    });
  }

  next();
};
