import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./NewPost.module.css";
import useInput from "../../Hooks/use-input";
import { createNewPost } from "../../Actions/Post";
import { useDispatch } from "react-redux";

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredTitle,
    wasTouched: titleWasTouched,
    valueIsValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
  } = useInput((value) => {
    return value.trim().length > 1;
  });

  const {
    value: enteredContent,
    wasTouched: contentWasTouched,
    valueIsValid: contentIsValid,
    valueChangeHandler: contentChangeHandler,
    valueBlurHandler: contentBlurHandler,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const formIsValid = titleIsValid && contentIsValid;

  const createPostHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    await dispatch(createNewPost(enteredTitle, enteredContent));
    navigate("/", { replace: true });
  };

  return (
    <div className={classes.newpost}>
      <form className={classes.newpost__form} onSubmit={createPostHandler}>
        <h1 className={classes.newpost__heading}>New Post</h1>
        <div
          className={
            !titleIsValid && titleWasTouched
              ? `${classes.invalid} ${classes.form__control}`
              : classes.form__control
          }
        >
          <input
            className={classes.newpost__input}
            type="text"
            placeholder="Title"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
        </div>
        <div className={
            !contentIsValid && contentWasTouched
              ? `${classes.invalid} ${classes.form__control}`
              : classes.form__control
          }>
          <textarea
            className={classes.newpost__input}
            type="text"
            placeholder="Description"
            value={enteredContent}
            onChange={contentChangeHandler}
            onBlur={contentBlurHandler}
          />
        </div>
        <button className={classes.newpost__button} type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
