import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Home from "./Components/Home/Home";
import NewPost from "./Components/NewPost/NewPost";
import Header from "./Components/Header/Header";
import Account from "./Components/Account/Account";
import Login from "./Components/Login/Login";
import { loadMe } from "./Actions/User";
import Loader from "./Components/UI/Loader/Loader";
import Signup from "./Components/Signup/Signup";
import User from "./Components/User/User";
import SinglePost from "./Components/SinglePost/SinglePost";
import AllUsers from "./Components/AllUsers/AllUsers";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMe());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLoggedIn;
  return isLoading ? (
    <Loader />
  ) : (
    <Router>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route
          path="/my-account"
          element={isLoggedIn ? <Account /> : <Login />}
        />
        <Route path="/user/:userId" element={isLoggedIn ? <User /> : <Login />}/>
        <Route path="/post/:postId" element= {isLoggedIn ? <SinglePost /> : <Login />}/>
        <Route path="/users" element={isLoggedIn ? <AllUsers /> : <Login />}/>
        <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Home /> : <Signup />} />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
        />

        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </Router>
  );
}

export default App;
