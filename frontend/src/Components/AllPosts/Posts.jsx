import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import classes from "./Posts.module.css";

const Posts = ({ posts }) => {
  const { user } = useSelector((state) => state.user);
  const postContent = posts.map((post) => {
    return (
      <Post
        key={post._id}
        postId={post._id}
        userId={user._id}
        title={post.title}
        content={post.content}
        createdAt={post.createdAt}
        likes={post.likes}
        dislikes={post.dislikes}
        comments={post.comments}
        owner={post.user.username}
      />
    );
  });
  return <div className={classes.posts}> {postContent} </div>;
};

export default Posts;
