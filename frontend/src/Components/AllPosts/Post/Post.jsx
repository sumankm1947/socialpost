import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import classes from "./Post.module.css";
import { likeDislikePost } from "../../../Actions/Post";

const Post = ({
  postId,
  userId = undefined,
  title,
  content,
  createdAt,
  likes = [],
  dislikes = [],
  comments = [],
  owner,
  account = false,
  isSinglePost = false,
  deletePostHandler = () => {},
}) => {
  const date = createdAt.split("T")[0];

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [dislikeCount, setDislikeCount] = useState(dislikes.length);
  const dispatch = useDispatch();

  useEffect(() => {
    likes.forEach((like) => {
      if (like._id === userId) setIsLiked(true);
    });

    dislikes.forEach((dislike) => {
      if (dislike._id === userId) setIsDisliked(true);
    });
  }, [likes, dislikes, userId]);

  const likeHandler = () => {
    setIsLiked(!isLiked);
    dispatch(likeDislikePost(postId, 1));
    if (isLiked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    if (isDisliked) {
      setDislikeCount((prevCount) => prevCount - 1);
      setIsDisliked(false);
    }
  };

  const dislikeHandler = () => {
    setIsDisliked(!isDisliked);
    dispatch(likeDislikePost(postId, 0));
    if (isDisliked) {
      setDislikeCount((prevCount) => prevCount - 1);
    } else {
      setDislikeCount((prevCount) => prevCount + 1);
    }
    if (isLiked) {
      setLikeCount((prevCount) => prevCount - 1);
      setIsLiked(false);
    }
  };
  
  return (
    <div className={classes.post}>
      <div className={classes.content}>
        {!account && (
          <Link to={`/user/${owner}`}>
            <AiOutlineUser />
            {owner}
          </Link>
        )}
        {account && (
          <div className={classes.deletepost}
            onClick={() => {
              deletePostHandler(postId);
            }}
          >
            <MdDelete />
          </div>
        )}
        <h2>{title}</h2>
        <p>{content}</p>
        <div className={classes.date}>Posted on : {date}</div>
        {!isSinglePost && (
          <Link className={classes.seecomments} to={`/post/${postId}`}>
            See Comments
          </Link>
        )}
      </div>
      <div className={classes.status}>
        <div
          className={
            isLiked ? `${classes.likes} ${classes.active}` : `${classes.likes}`
          }
          onClick={likeHandler}
        >
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          <span className={classes.count}>{likeCount}</span>
        </div>
        <div
          className={
            isDisliked
              ? `${classes.dislikes} ${classes.active}`
              : `${classes.dislikes}`
          }
          onClick={dislikeHandler}
        >
          {isDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
          <span className={classes.count}>{dislikeCount}</span>
        </div>
        <Link className={classes.comments} to={`/post/${postId}`}>
          <AiOutlineComment />
          <span className={classes.count}>{comments.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Post;
