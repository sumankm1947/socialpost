import React from "react";
import { NavLink } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

import classes from "./Header.module.css";
import Logo from "../../Assets/Images/logo_image.png";

const Header = () => {
  return (
    <div className={classes.header}>
        <div className={classes.logo}>
          <NavLink to="/" >
            <img src={Logo} alt="logo" />
          </NavLink>
        </div>
      <ul className={classes.header__box}>
        <li className={classes.header__item}>
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive
                ? `${classes.active} ${classes.header__link}`
                : `${classes.header__link}`
            }
          >
            <AiFillHome />
          </NavLink>
        </li>
        <li className={classes.header__item}>
          <NavLink
            to="/users"
            className={(navData) =>
              navData.isActive
                ? `${classes.active} ${classes.header__link}`
                : `${classes.header__link}`
            }
          >
            <FaUsers />
          </NavLink>
        </li>
        <li className={classes.header__item}>
          <NavLink
            to="/new-post"
            className={(navData) =>
              navData.isActive
                ? `${classes.active} ${classes.header__link}`
                : `${classes.header__link}`
            }
          >
            <BsPlusLg />
          </NavLink>
        </li>
        <li className={classes.header__item}>
          <NavLink
            to="/my-account"
            className={(navData) =>
              navData.isActive
                ? `${classes.active} ${classes.header__link}`
                : `${classes.header__link}`
            }
          >
            <MdAccountCircle />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
