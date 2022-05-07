import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../UI/Loader/Loader";
import Post from "../AllPosts/Post/Post";
import { userLogout } from "../../Actions/User";
import { getMyPosts, deletePost } from "../../Actions/Post";
import classes from "./Account.module.css";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);

  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);
  const { isLoading: postsIsLoading, posts } = useSelector(
    (state) => state.myPosts
  );

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    setMyPosts(posts);
  }, [posts]);
  
  const deletePostHandler = (postId) => {
    dispatch(deletePost(postId));
    setMyPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const postContent = myPosts.length > 0 ? myPosts.map((post) => {
    return (
      <Post
        key={post._id}
        postId={post._id}
        userId={user._id}
        title={post.title}
        content={post.content}
        createdAt={post.createdAt}
        comments={post.comments}
        likes={post.likes}
        dislikes={post.dislikes}
        owner={user.username}
        account={true}
        deletePostHandler={deletePostHandler}
      />
    );
  }): (
    <p className={classes.noposts}>You have no posts yet!</p>
  );

  const logoutHandler = async (e) => {
    await dispatch(userLogout());
    navigate("/", { replace: true });
    window.location.reload();
  };
  return postsIsLoading || userIsLoading ? (
    <Loader />
  ) : (
    <div className={classes.account}>
      <div className={classes.account__details}>
        <h1>My Account</h1>
        <div className={classes.details}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <button className={classes.logout} type="button" onClick={logoutHandler}>
        Logout
      </button>
      <div className={classes.posts__box}>
        <h2>My Posts</h2>
        <div className={classes.posts}>{postContent}</div>
      </div>
    </div>
  );
};

export default Account;
