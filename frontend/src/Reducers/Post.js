import { createReducer } from "@reduxjs/toolkit";

export const postReducer = createReducer(
  {
    message: "",
    isLoading: false,
    error: null,
  },
  {
    LIKE_POST_REQUEST: (state) => {
      state.isLoading = true;
    },
    LIKE_POST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    LIKE_POST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    DISLIKE_POST_REQUEST: (state) => {
      state.isLoading = true;
    },
    DISLIKE_POST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    DISLIKE_POST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    NEW_POST_REQUEST: (state) => {
      state.isLoading = true;
    },
    NEW_POST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    NEW_POST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    NEW_COMMENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    NEW_COMMENT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    NEW_COMMENT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    DELETE_COMMENT_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_COMMENT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    DELETE_COMMENT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    DELETE_POST_REQUEST: (state) => {
      state.isLoading = true;
    },
    DELETE_POST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    DELETE_POST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
    CLEAR_MESSAGE: (state) => {
      state.message = null;
    },
  }
);

export const myPostReducer = createReducer(
  {
    posts: [],
    isLoading: false,
    error: null,
  },
  {
    LOAD_POSTS_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    LOAD_POSTS_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    LOAD_POSTS_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
  }
);

export const allPosts = createReducer(
  {
    posts: [],
    isLoading: false,
    error: null,
  },
  {
    LOAD_ALL_POSTS_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    LOAD_ALL_POSTS_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    LOAD_ALL_POSTS_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
);

export const userPostsReducer = createReducer(
  {
    posts: [],
    isLoading: false,
    error: null,
  },
  {
    LOAD_USER_POSTS_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    LOAD_USER_POSTS_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    },
    LOAD_USER_POSTS_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
);

export const getPostReducer = createReducer(
  {
    post: {},
    isLoading: false,
    error: null,
  },
  {
    LOAD_POST_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    LOAD_POST_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      state.error = null;
    },
    LOAD_POST_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
);
