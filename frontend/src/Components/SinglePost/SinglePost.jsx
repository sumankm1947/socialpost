import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getPost } from "../../Actions/Post";
import Post from "../AllPosts/Post/Post";
import Loader from "../UI/Loader/Loader";
import classes from "./SinglePost.module.css";

const SinglePost = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;

  const [allComments, setAllComments] = useState([]);
  const { user, isLoading: userIsLoading } = useSelector((state) => state.user);
  const { post, isLoading: postIsLoading } = useSelector(
    (state) => state.getPost
  );

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);


  const postContent = (
    <Post
      postId={post._id}
      userId={user._id}
      title={post.title}
      content={post.content}
      createdAt={post.createdAt || new Date().toISOString()}
      likes={post.likes}
      dislikes={post.dislikes}
      comments={allComments}
      owner={post.user ? post.user.username : "Unknown"}
      isSinglePost={true}
    />
  );

  return postIsLoading || userIsLoading ? (
    <Loader />
  ) : (
    <div className={classes.post__content}>
      <div className={classes.post}>{postContent}</div>
      <Comments
        postId={postId}
        allComments={allComments}
        setAllComments={setAllComments}
      />
    </div>
  );
};

export default SinglePost;
