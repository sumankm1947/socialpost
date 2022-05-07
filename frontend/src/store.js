import { configureStore } from "@reduxjs/toolkit";
import {
  myPostReducer,
  allPosts,
  userPostsReducer,
  getPostReducer,
  postReducer,
} from "./Reducers/Post";
import { userReducer, getUserReducer, getAllUsers } from "./Reducers/User";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    allPosts: allPosts,
    myPosts: myPostReducer,
    getUser: getUserReducer,
    allUsers: getAllUsers,
    userPosts: userPostsReducer,
    getPost: getPostReducer,
  },
});

export default store;
