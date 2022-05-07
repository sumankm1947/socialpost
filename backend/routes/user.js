const express = require("express");
const { body } = require("express-validator");

const { isAuth } = require("../middlewares/auth");
const userControllers = require("../controllers/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  userControllers.signup
);

router.post(
  "/login",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  userControllers.login
);

router.get("/user/:username", isAuth, userControllers.getUser);

router.get("/users", isAuth, userControllers.getUsers);

router.post("/logout", isAuth, userControllers.logout);

router.post(
  "/password/forgot",
  [body("email").isEmail().withMessage("Please enter a valid email")],
  userControllers.forgotPassword
);

router.post(
  "/password/reset/:token",
  [body("password").not().isEmpty().withMessage("Password is required")],
  userControllers.resetPassword
);

router.get("/my-account", isAuth, userControllers.getMyProfile);

router.get("/my-posts", isAuth, userControllers.getMyPosts);

router.get("/posts/:username", isAuth, userControllers.getUserPosts);

module.exports = router;
