import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../Context/AuthContext/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authState, dispatch] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginFormHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post("api/auth/login", { email, password });
    if (response.status === 200) {
      dispatch({ type: "HANDLE_USER_AUTH", payload: response.data });
      localStorage.setItem("jwt", JSON.stringify(response.data.encodedToken));

      navigate(location.state?.from?.pathname || "/", { replace: true });
    } else {
      console.log("error");
    }
  };

  return (
    <div className="auth-page login-page">
      <h2>Login</h2>

      <form onSubmit={loginFormHandler}>
        <div className="input">
          <label>Email</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <button
        onClick={() => {
          setEmail("adarshbalika@gmail.com");
          setPassword("adarshBalika123");
        }}
        className="btn btn-outline-secondary"
      >
        Login with test credentials
      </button>

      <button type="submit" className="btn btn-link">
        <a href="#" className="link">
          Forgot Password?
        </a>
      </button>

      <Link to="/signup">
        <button className="btn btn-link" id="btn-to-signup">
          <p className="link">Don't have an account? Sign Up</p>
        </button>
      </Link>
    </div>
  );
};

export default LoginForm;
