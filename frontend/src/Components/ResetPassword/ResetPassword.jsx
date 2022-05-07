import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";
import useInput from "../../Hooks/use-input";

import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    value: enteredPassword,
    wasTouched: passwordWasTouched,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const token = params.token;

  const resetPasswordFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, enteredPassword));
    navigate("/login", { replace: true });
  };

  return (
    <div className={classes.resetPassword}>
      <h1>Reset Password</h1>
      <p>Enter your new Password</p>
      <form onSubmit={resetPasswordFormSubmitHandler} className={classes.form}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your new password"
          className={`${classes.form__input} ${
            !passwordIsValid && passwordWasTouched && classes.invalid
          }`}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        <button type="submit" className={classes.form__button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
