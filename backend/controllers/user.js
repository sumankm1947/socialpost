const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");

const { checkValidationErrors } = require("../utils/error");
const transporter = require("../utils/email");
const Post = require("../models/Post");

exports.signup = async (req, res, next) => {
  try {
    checkValidationErrors(req, res);
    const { username, email, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashedPw = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPw,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // console.log(req.body);
    checkValidationErrors(req, res);
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.find({ username: username }).populate("posts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username: username });

    const posts = await Post.find({ user: user._id }).populate(
      "likes dislikes comments"
    );

    // const user = await User.find({username: username}).populate("posts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Removing cookie
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User logged out successfully",
      });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    checkValidationErrors(req, res);
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${user.resetPasswordToken}`;
    // const resetUrl = `${process.env.FRONTEND_HOST}/password/reset/${user.resetPasswordToken}`;
    try {
      await transporter.sendMail({
        to: req.body.email,
        from: "sumanmandal.superb1@gmail.com",
        subject: "Password Reset",
        html: `
                <p>You requested a password reset</p>
                <p>Click this <a href="${resetUrl}">link</a> to set a new password</p>
              `,
      });

      res.status(200).json({
        success: true,
        message: "Email sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.send(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    checkValidationErrors(req, res);
    const { password } = req.body;
    const resetPasswordToken = req.params.token;
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const hashedPw = await bcrypt.hash(password, 10);
    user.password = hashedPw;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyProfile = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    const posts = await Post.find({ user: id })
      .populate("user likes dislikes comments")
      .sort({ createdAt: -1 }); // populate user likes dislikes comments
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Posts not found",
      });
    }
    res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    next(error);
  }
};
