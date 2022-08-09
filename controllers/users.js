import Users from "../models/Users.js";
import { generatePassword } from "../services/auth.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { responseHandler } from "../services/errors.js";

export const addUser = async (req, res) => {
  try {
    const { fullName, email, shopName, password } = req.body;
    const { hash, salt } = await generatePassword(password);
    const user = await Users.create({
      fullName,
      email,
      shopName,
      salt,
      password: hash,
      products: [],
    });
    return responseHandler(
      res,
      `${fullName} your account was created successfully`,
      201,
      user
    );
  } catch (error) {
    return responseHandler(res, 401, "Email created already", error);
  }
};

export const getUser = async (req, res) => {
  try {
    return responseHandler(res, 200, "User found successfully", req.user);
  } catch (error) {
    return responseHandler(res, 401, "User not found", error);
  }
};

//   res.status(200).send({
//     message: "User found successfully",
//     data: req.user,
//   });
// };

// export const getUsers = async (req, res) => {
//   const users = await Users.find();
//   return res.status(200).send({
//     message: "Users fetched successfully",
//     data: users,
//   });
// };

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    return responseHandler(res, 200, "Users fetched successfully", users);
  } catch (error) {
    return responseHandler(res, 400, "Fetching users failed", error);
  }
};

export const deleteUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const deletedUser = await Users.findByIdAndDelete(_id);
    return responseHandler(res, 200, "User deleted successfully", deletedUser);
    // return res.status(200).send({
    //   message: "User deleted",
    //   data: deletedUser,
    // });
  } catch (error) {
    console.log(error);
    return responseHandler(res, 400, "There is an issue", error);
    // return res.status(400).send({
    //   message: "There is an issue",
    //   data: error,
    // });
  }
};

// export const loginUser = async (req, res) => {
//   try{
//   const { userEmail, userPassword } = req.body;
//   const user = await Users.findOne({ email: userEmail });
//   const valid = await comparePassword(userPassword, user.password);
//     if (!valid) {
//       return responseHandler(res, 401, "Incorrect email or password,null");
//       // return res.status(401).send({
//       //   message: "Incorrect email or password",
//       //   data: null,
//       // });

//     }
// }catch(error){
//   const { password, salt, _id, fullName, email, shopName,} = user;
//   const token = await jwt.sign( _id, fullName, email, shopName, password, process.env.JWT_SECRET);
//   return responseHandler(res, 200, "User has logged in successfully", token);
//   // return res.status(200).send({
//   //   message: "User has logged in successfully",
//   //   data: token,
//   // });
//     }
// };

export const loginUser = async (req, res) => {
  try {
    const { _id, fullName, email, shopName, password } = req.user;
    const token = await jwt.sign(
      { _id, fullName, email, shopName, password },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res
      .header("X-auth-token", token)
      .status(200)
      .send({
        message: "User logged in successfully",
        data: { user: req.user, token },
      });
  } catch (error) {
    return responseHandler(res, 400, "User unable to log in", error);
  }
};
