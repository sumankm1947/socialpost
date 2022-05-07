export const userSignup = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "SIGNUP_REQUEST" });
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "SIGNUP_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    dispatch({ type: "SIGNUP_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "SIGNUP_FAILURE", payload: error.response.data.message });
  }
};

export const userLogin = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    // console.log(data);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.message,
    });
  }
};

export const loadMe = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });

    const response = await fetch("/api/user/my-account", {
      method: "GET",
    });
    // console.log(response);
    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "LOAD_USER_FAILURE",
        payload: error,
      });
      return;
    }
    const data = await response.json();
    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAILURE",
      payload: error.message,
    });
  }
};

export const loadUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_REQUEST",
    });

    const response = await fetch(`/api/user/user/${username}`, {
      method: "GET",
    });
    // console.log(response);
    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "GET_USER_FAILURE",
        payload: error,
      });
      return;
    }
    const data = await response.json();
    dispatch({
      type: "GET_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_FAILURE",
      payload: error.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST",
    });

    const response = await fetch("/api/user/logout", {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "LOGOUT_FAILURE",
        payload: error.message,
      });
      return;
    }
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAILURE",
      payload: error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_ALL_USERS_REQUEST",
    });

    const response = await fetch("/api/user/users", {
      method: "GET",
    });
    // console.log(response);
    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "GET_ALL_USERS_FAILURE",
        payload: error,
      });
      return;
    }
    const data = await response.json();
    dispatch({
      type: "GET_ALL_USERS_SUCCESS",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_USERS_FAILURE",
      payload: error.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "FORGOT_PASSWORD_REQUEST",
    });

    const response = await fetch("/api/user/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "FORGOT_PASSWORD_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    dispatch({
      type: "FORGOT_PASSWORD_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "FORGOT_PASSWORD_FAILURE",
      payload: error.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "RESET_PASSWORD_REQUEST",
    });

    const response = await fetch(`/api/user/password/reset/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "RESET_PASSWORD_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    dispatch({
      type: "RESET_PASSWORD_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAILURE",
      payload: error.message,
    });
  }
};
