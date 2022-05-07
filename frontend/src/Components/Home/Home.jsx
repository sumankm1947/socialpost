import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Home.module.css";
import Posts from "../AllPosts/Posts";
import { getAllPosts } from "../../Actions/Post";
import Loader from "../UI/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  // console.log("HOME");

  const { posts, isLoading } = useSelector((state) => state.allPosts);

  // console.log(posts);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.home}>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
