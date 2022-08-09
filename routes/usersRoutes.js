import { Router } from "express";
import {
  validateUser,
  checkForUser,
  validateUserSignin,
  auth,
} from "../middleware/users.js";
import {
  addUser,
  getUser,
  getUsers,
  loginUser,
  deleteUser,
} from "../controllers/users.js";

const router = Router();

router.post("/users/signup", validateUser, addUser);
router.post("/users/auth/signin", validateUserSignin, getUser);
router.get("/user/:userId", checkForUser, getUser);
router.delete("/user/delete", deleteUser);
router.get("/user", getUser);
router.post("/users/signin", auth, validateUserSignin, loginUser);
router.get("/users", getUsers);

export default router;
