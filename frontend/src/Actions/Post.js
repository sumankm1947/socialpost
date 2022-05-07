export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_POSTS_REQUEST",
    });

    const response = await fetch("/api/user/my-posts", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "LOAD_POSTS_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    // console.log(data);
    dispatch({
      type: "LOAD_POSTS_SUCCESS",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_POSTS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_ALL_POSTS_REQUEST",
    });

    const response = await fetch("/api/post/posts", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "LOAD_ALL_POSTS_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    // console.log(data);
    dispatch({
      type: "LOAD_ALL_POSTS_SUCCESS",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_ALL_POSTS_FAILURE",
      payload: error.message,
    });
  }
};

export const createNewPost = (title, content) => async (dispatch) => {
  try {
    dispatch({
      type: "NEW_POST_REQUEST",
    });
    const response = await fetch("/api/post/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "NEW_POST_FAILURE",
        payload: error.message,
      });
      return;
    }

    const data = await response.json();

    dispatch({
      type: "NEW_POST_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "NEW_POST_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_POST_REQUEST",
    });
    const response = await fetch(`/api/post/delete-post/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "DELETE_POST_FAILURE",
        payload: error.message,
      });
      return;
    }

    const data = await response.json();
    dispatch({
      type: "DELETE_POST_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_POST_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const likeDislikePost = (postId, choice) => async (dispatch) => {
  try {
    dispatch({
      type: choice === 1 ? "LIKE_POST_REQUEST" : "DISLIKE_POST_REQUEST",
    });
    const response = await fetch(`/api/post/like-dislike/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        choice: choice,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: choice === 1 ? "LIKE_POST_FAILURE" : "DISLIKE_POST_FAILURE",
        payload: error.message,
      });
      return;
    }

    const data = await response.json();

    dispatch({
      type: choice === 1 ? "LIKE_POST_SUCCESS" : "DISLIKE_POST_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: choice === 1 ? "LIKE_POST_FAILURE" : "DISLIKE_POST_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_POSTS_REQUEST",
    });

    const response = await fetch(`/api/user/posts/${username}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "LOAD_USER_POSTS_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    // console.log(data);
    dispatch({
      type: "LOAD_USER_POSTS_SUCCESS",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_POSTS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_POST_REQUEST",
    });

    const response = await fetch(`/api/post/post/${postId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "LOAD_POST_FAILURE",
        payload: error.message,
      });
      return;
    }
    const data = await response.json();
    // console.log(data);
    dispatch({
      type: "LOAD_POST_SUCCESS",
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_POST_FAILURE",
      payload: error.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "NEW_COMMENT_REQUEST",
    });

    const response = await fetch(`/api/post/add-comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "NEW_COMMENT_FAILURE",
        payload: error.message,
      });
      return;
    }

    const data = await response.json();

    dispatch({
      type: "NEW_COMMENT_SUCCESS",
      payload: data,
    });

    return data.commentId;
  } catch (error) {
    dispatch({
      type: "NEW_COMMENT_FAILURE",
      payload: error.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_COMMENT_REQUEST",
    });

    const response = await fetch(`/api/post/delete-comment/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({
        type: "DELETE_COMMENT_FAILURE",
        payload: error.message,
      });
      return;
    }

    const data = await response.json();

    dispatch({
      type: "DELETE_COMMENT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_COMMENT_FAILURE",
      payload: error.message,
    });
  }
};
