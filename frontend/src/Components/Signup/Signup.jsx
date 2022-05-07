import React from "react";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../Actions/User";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../Utils/validate-email";
import { AiFillLock } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import classes from "./Signup.module.css";
import useInput from "../../Hooks/use-input";
import Logo from "../../Assets/Images/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredUsername,
    wasTouched: usernameWasTouched,
    valueIsValid: usernameIsValid,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredEmail,
    wasTouched: emailWasTouched,
    valueIsValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    wasTouched: passwordWasTouched,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const formIsValid = usernameIsValid && passwordIsValid && emailIsValid;

  const signupHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    dispatch(userSignup(enteredUsername, enteredEmail, enteredPassword));
    navigate("/", { replace: true });
  };

  return (
    <div className={classes.signup}>
      <form onSubmit={signupHandler} className={classes.signup__form}>
        <h1 className={classes.signup__heading}>Signup</h1>
        <div className={classes.signup__logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={classes.form__control}>
          <FaUser className={classes.signup__icon} />
          <input
            type="text"
            placeholder="Username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            className={`${classes.signup__input} ${
              !usernameIsValid && usernameWasTouched && classes.invalid
            }`}
          />
        </div>
        <div className={classes.form__control}>
          <MdEmail className={classes.signup__icon} />
          <input
            type="email"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={`${classes.signup__input} ${
              !emailIsValid && emailWasTouched && classes.invalid
            }`}
          />
        </div>
        <div className={classes.form__control}>
          <AiFillLock className={classes.signup__icon} />
          <input
            type="password"
            placeholder="Password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={`${classes.signup__input} ${
              !passwordIsValid && passwordWasTouched && classes.invalid
            }`}
          />
        </div>
        <div className={classes.signup__actions}>
          <button type="submit" className={classes.signup__button}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
