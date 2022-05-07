const Post = require("../models/Post");
const User = require("../models/User");

const { checkValidationErrors } = require("../utils/error");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("user comments likes dislikes")
      .sort({ createdAt: -1 });
    res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
      .populate("user comments comments.user likes dislikes");
    res.status(200).json({
      success: true,
      post: post,
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    checkValidationErrors(req, res);
    const { title, content } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const newPost = new Post({
      title,
      content,
      user: userId,
    });

    const post = await Post.create(newPost);
    user.posts.unshift(post._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.user.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }
    await post.remove();

    const user = await User.findById(userId);
    const index = user.posts.indexOf(postId);
    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.likeAndDislikePost = async (req, res, next) => {
  try {
    checkValidationErrors(req, res);
    const postId = req.params.id;
    const userId = req.user._id;
    const likeOrDislike = req.body.choice;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // 1 => Like/Unlike
    if (likeOrDislike === 1) {
      // Like or Unlike
      const index1 = post.likes.indexOf(userId);
      if (index1 > -1) {
        post.likes.splice(index1, 1);
      } else {
        post.likes.push(userId);
      }
      // Remove dislike if available
      const index2 = post.dislikes.indexOf(userId);
      if (index2 > -1) {
        post.dislikes.splice(index2, 1);
      }
      await post.save();

      res.status(200).json({
        success: true,
        message: "Post liked/Unliked successfully",
      });
    } else {
      // Dislike or Undislike
      const index1 = post.dislikes.indexOf(userId);
      if (index1 > -1) {
        post.dislikes.splice(index1, 1);
      } else {
        post.dislikes.push(userId);
      }

      // Remove like if available
      const index2 = post.likes.indexOf(userId);
      if (index2 > -1) {
        post.likes.splice(index2, 1);
      }

      await post.save();

      res.status(200).json({
        success: true,
        message: "Post disliked/Undisliked successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    checkValidationErrors(req, res);
    const postId = req.params.id;
    const userId = req.user._id;
    const { comment } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const newComment = {
      user: userId,
      comment,
    };
    post.comments.unshift(newComment);
    await post.save();

    const newCommentId = post.comments[0]._id;

    res.status(200).json({
      commentId: newCommentId,
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    checkValidationErrors(req, res);
    const postId = req.params.id;
    const userId = req.user._id;
    const commentId = req.body.commentId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId.toString()
    );
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (comment.user.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    post.comments.forEach((item, index) => {
      if (item._id.toString() === commentId.toString()) {
        return post.comments.splice(index, 1);
      }
    });
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
