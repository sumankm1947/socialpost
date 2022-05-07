import React, { Fragment, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import useInput from "../../Hooks/use-input";
import { addCommentOnPost, deleteCommentOnPost } from "../../Actions/Post";
import Loader from "../UI/Loader/Loader";
import classes from "./Comments.module.css";

const Comments = ({ postId, allComments, setAllComments }) => {
  const dispatch = useDispatch();

  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);

  const { post, isLoading: postIsLoading } = useSelector(
    (state) => state.getPost
  );

  useEffect(() => {
    if (!post.comments) return;
    setAllComments(
      post.comments.map((comment) => {
        return {
          owner: comment.user.username,
          ownerId: comment.user._id,
          comment: comment.comment,
          id: comment._id,
        };
      })
    );
  }, [post, setAllComments]);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    if (!commentIsValid) {
      return;
    }
    const commentId = await dispatch(addCommentOnPost(postId, enteredComment));
    commentReset();
    const newComment = {
      owner: user.username,
      ownerId: user._id,
      comment: enteredComment,
      id: commentId,
    };
    setAllComments((prevComments) => [newComment, ...prevComments]);
  };

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteCommentOnPost(postId, commentId));
    setAllComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const commentContent =
    allComments.length > 0 ? (
      allComments.map((comment) => {
        return (
          <div className={classes.comment} key={comment.id}>
            <div className={classes.comment__header}>
              <AiOutlineUser />
              <Link to={`/user/${comment.owner}`}>{comment.owner}</Link>
            </div>
            <div className={classes.comment__content}>
              <div className={classes.comment__text}>{comment.comment}</div>
              {user._id === comment.ownerId && (
                <div className={classes.comment__delete}>
                  <MdDelete
                    onClick={() => {
                      deleteCommentHandler(comment.id);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })
    ) : (
      <div>No comments Yet</div>
    );

  const {
    value: enteredComment,
    wasTouched: commentWasTouched,
    valueIsValid: commentIsValid,
    valueChangeHandler: commentChangeHandler,
    valueBlurHandler: commentBlurHandler,
    reset: commentReset,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  return postIsLoading || userIsLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className={classes.comment__form}>
        <form onSubmit={addCommentHandler} className={classes.form}>
          <div className={classes.comment__add}>
            <label htmlFor="comment"> Add comment </label>
            <textarea
              name="comment"
              id="comment"
              rows="3"
              placeholder="Enter Comment"
              value={enteredComment}
              onChange={commentChangeHandler}
              onBlur={commentBlurHandler}
              className={`${
                !commentIsValid && commentWasTouched && classes.invalid
              }`}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={classes.comment__all}>{commentContent}</div>
    </Fragment>
  );
};

export default Comments;
