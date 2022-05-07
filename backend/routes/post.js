const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const postControllers = require("../controllers/post");
const { isAuth } = require("../middlewares/auth");

router.get("/posts", postControllers.getPosts);

router.get("/post/:postId", postControllers.getPost);

router.post(
  "/create-post",
  isAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("content").not().isEmpty().withMessage("Content is required"),
  ],
  postControllers.createPost
);

router.delete("/delete-post/:id", isAuth, postControllers.deletePost);

router.post(
  "/like-dislike/:id",
  isAuth,
  body("choice").isNumeric(),
  postControllers.likeAndDislikePost
);

router.post(
  "/add-comment/:id",
  [body("comment").not().isEmpty().withMessage("Comment is required")],
  isAuth,
  postControllers.addComment
);

router.delete(
  "/delete-comment/:id",
  [body("commentId").not().isEmpty()],
  isAuth,
  postControllers.deleteComment
);

module.exports = router;
