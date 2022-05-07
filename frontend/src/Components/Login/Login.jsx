import React from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Login.module.css";
import useInput from "../../Hooks/use-input";
import { userLogin } from "../../Actions/User";
import { useDispatch } from "react-redux";
import Logo from "../../Assets/Images/logo.png";
import { AiFillLock } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

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
    value: enteredPassword,
    wasTouched: passwordWasTouched,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const formIsValid = usernameIsValid && passwordIsValid;

  const loginHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    dispatch(userLogin(enteredUsername, enteredPassword));
    navigate("/", { replace: true });
  };

  return (
    <div className={classes.login}>
      <form onSubmit={loginHandler} className={classes.login__form}>
        <h1 className={classes.login__heading}>Login</h1>
        <div className={classes.login__logo}>
          <img src={Logo} alt="logo"/>
        </div>
        <div className={classes.form__control}>
          <FaUser className={classes.login__icon} />
          <input
            type="text"
            placeholder="Username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            className={`${classes.login__input} ${
              !usernameIsValid && usernameWasTouched && classes.invalid
            }`}
          />
        </div>
        <div className={classes.form__control}>
          <AiFillLock className={classes.login__icon} />
          <input
            type="password"
            placeholder="Password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={`${classes.login__input} ${
              !passwordIsValid && passwordWasTouched && classes.invalid
            }`}
          />
        </div>
        <div className={classes.login__actions}>
          <Link to="/password/forgot" className={classes.login__forgot}>
            Forgot Password?
          </Link>
          <button type="submit" className={classes.login__button}>
            Login
          </button>
          <Link to="/signup" className={classes.login__signup}>
            New User?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
