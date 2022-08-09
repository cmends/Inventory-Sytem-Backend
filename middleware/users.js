import { userSignUpSchema, userSignInSchema } from "./validation.js";
import Users from "../models/Users.js";
import { comparePassword } from "../services/auth.js";
import jwt from "jsonwebtoken";
import { responseHandler } from "../services/errors.js";
import "dotenv/config";

export const validateUser = async (req, res, next) => {
  const { error } = userSignUpSchema.validate(req.body);
  const user = await Users.findOne({ email: req.body.email });
  if (error) {
    return res.status(400).send({
      error,
    });
  }
  if (user) {
    // return res.status(400).send({
    //   message: "User with the same email already exist",
    // });
    return responseHandler(
      res,
      400,
      "User with the same email already exist",
      null
    );
  }
  next();
};

export const validateUserSignin = async (req, res, next) => {
  try {
    const { error } = userSignInSchema.validate(req.body);
    const user = await Users.findOne({ email: req.body.email });
    const valid = await comparePassword(req.body.password, user.password);
    if (!valid) {
      // return res.status(404).send({
      //   message: "Wrong user email & password combination",
      // });
      return responseHandler(
        res,
        400,
        "Wrong user email & password combination",
        null
      );
    }
    // if (error) {
    //   return res.status(400).send({
    //     error,
    //   });
    // }
    // if (user) {
    //   if (user.password !== req.body.password) {
    //     return res.status(400).send({
    //       message: "Incorrect Password",
    //     });
    //   }
    // }
    // if (!valid) {
    //   return res.status(404).send({
    //     message: "Wrong user email & password combination",
    //   });
    //   return responseHandler(res, 400, "Wrong email or passwrod entered", null);
    // }
    req.user = user;
    next();
  } catch (error) {
    return responseHandler(res, 400, "Wrong email or password entered");
  }
};

export const checkForUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.userId);
    if (!user) {
      return responseHandler(res, 404, "User not found", null);
      // return res.status(404).send({
      //   message: "User not found",
      //   data: null,
      // });
    }
    req.user = user;
    next();
  } catch (error) {
    return responseHandler(res, 400, "User not found", error);
  }
};

export const validateCompany = (req, res, next) => {
  const { error } = userSignUpSchema.validate(req.body);
  if (error) {
    return responseHandler(res, 400, "Issue encountered", error);
    // return res.status(400).send({
    //   error,
    // });
  }
  next();
};

export const auth = async (req, res, next) => {
  const { token } = req.headers;
  // console.log(token);
  if (!token) {
    return responseHandler(
      res,
      400,
      "Access denied. No token was provided",
      null
    );
    // return res.status(400).send({
    //   message: "Access denied. No token was provided",
    //   data: null,
    // });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  console.log(decoded);
    if (!decoded) {
      return responseHandler(
        res,
        403,
        "You do not have the right access to this resource",
        null
      );
      // return res.status(403).send({
      //   message: "You do not have the right access to this resource",
      //   data: null,
      // });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return responseHandler(
      res,
      403,
      "You do not have the right to access this resource",
      null
    );
    // console.log(error);
    // return res.status(403).send({
    //   message: "You do not have the right access to this resource",
    //   data: null,
    // });
  }
};
