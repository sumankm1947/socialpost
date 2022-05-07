import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

import classes from "./AllUsers.module.css";
import { getAllUsers } from "../../Actions/User";
import Loader from "../UI/Loader/Loader";

const User = ({ username, totalposts, index }) => {
  return (
    <div className={classes.user}>
      <h2>User {index + 1}</h2>
      <Link to={`/user/${username}`}>
        <AiOutlineUser />
        {username}
      </Link>
      <p>
        Total posts: <span>{totalposts}</span>
      </p>
      <hr />
    </div>
  );
};

const AllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users, isLoading } = useSelector((state) => state.allUsers);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.allusers}>
      <h1>All Users</h1>
      <div className={classes.users}>
        {users.map((user, index) => (
          <User
            key={user._id}
            username={user.username}
            totalposts={user.posts.length}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
