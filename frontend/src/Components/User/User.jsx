import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadUser } from "../../Actions/User";
import Post from "../AllPosts/Post/Post";
import { getUserPosts } from "../../Actions/Post";
import Loader from "../UI/Loader/Loader";
import classes from "./User.module.css";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const username = params.userId;

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (currentUser.username === username) {
      navigate("/my-account", { replace: true });
    }
  }, [currentUser, username, navigate]);

  useEffect(() => {
    dispatch(loadUser(username));
    dispatch(getUserPosts(username));
  }, [dispatch, username]);

  const { user: owner, isLoading: ownerIsLoading } = useSelector(
    (state) => state.getUser
  );
  const { posts, isLoading: postsIsLoading } = useSelector(
    (state) => state.userPosts
  );
  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);

  // console.log(posts);

  const postContent = posts.map((post) => {
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
        owner={owner.username}
        account={true}
      />
    );
  });

  return ownerIsLoading || userIsLoading || postsIsLoading ? (
    <Loader />
  ) : (
    <div className={classes.user}>
      <h1>User Profile</h1>
      <div className={classes.username}>Username : {username}</div>
      <div className={classes.posts__box}>
        <h2>Posts</h2>
        <div className={classes.posts}>{postContent}</div>
      </div>
    </div>
  );
};

export default User;
