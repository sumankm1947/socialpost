import React from "react";
import { useDispatch } from "react-redux";

import { forgotPassword } from "../../Actions/User";
import useInput from "../../Hooks/use-input";
import { validateEmail } from "../../Utils/validate-email";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    wasTouched: emailWasTouched,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const forgotPasswordFormSunbmitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(enteredEmail));
  };

  return (
    <div className={classes.forgotPassword}>
      <h1>Forgot Password</h1>
      <p>
        Enter your email address and we will send you a link to reset your
        password.
      </p>
      <form
        className={classes.form}
        onSubmit={forgotPasswordFormSunbmitHandler}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className={`${classes.form__input} ${
            !emailIsValid && emailWasTouched && classes.invalid
          }`}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <button type="submit" className={classes.form__button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
