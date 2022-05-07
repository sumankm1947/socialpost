import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    message: "",
  },
  {
    SIGNUP_REQUEST: (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.error = null;
    },
    SIGNUP_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    SIGNUP_FAILURE: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    LOGIN_REQUEST: (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.error = null;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    LOGIN_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    LOAD_USER_REQUEST: (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    LOAD_USER_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    LOGOUT_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    LOGOUT_SUCCES: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
    LOGOUT_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    FORGOT_PASSWORD_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = action.payload;
    },
    FORGOT_PASSWORD_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    RESET_PASSWORD_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = action.payload;
    },
    RESET_PASSWORD_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
);

export const getUserReducer = createReducer(
  {
    user: null,
    isLoading: false,
    error: null,
  },
  {
    GET_USER_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    GET_USER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    GET_USER_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
);

export const getAllUsers = createReducer(
  {
    users: [],
    isLoading: false,
    error: null,
  },
  {
    GET_ALL_USERS_REQUEST: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    GET_ALL_USERS_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    },
    GET_ALL_USERS_FAILURE: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
);
