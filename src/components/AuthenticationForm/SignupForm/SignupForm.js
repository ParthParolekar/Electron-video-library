import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../Context/AuthContext/AuthContext";
import axios from "axios";

const SignupForm = ({ setShowSignupForm }) => {
  const [newUserDetails, setNewUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [authState, dispatch] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const signupFormHandler = async (e) => {
    e.preventDefault();

    //Signup new user
    const signupResponse = await axios.post("api/auth/signup", newUserDetails);

    // Login the new user if signup is successful
    if (signupResponse.status === 201) {
      const response = await axios.post("api/auth/login", {
        email: newUserDetails.email,
        password: newUserDetails.password,
      });

      if (response.status === 200) {
        dispatch({ type: "HANDLE_USER_AUTH", payload: response.data });
        localStorage.setItem("jwt", JSON.stringify(response.data.encodedToken));

        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        console.log("error");
      }
    }
  };
  return (
    <div className="auth-page signup-page">
      <h2>Sign Up</h2>

      <form onSubmit={signupFormHandler}>
        <div className="input">
          <label>Email</label>
          <input
            value={newUserDetails.email}
            onChange={(e) =>
              setNewUserDetails({ ...newUserDetails, email: e.target.value })
            }
            type="email"
            required
          />
        </div>
        <div className="input">
          <label>New Password</label>
          <input
            value={newUserDetails.password}
            onChange={(e) =>
              setNewUserDetails({ ...newUserDetails, password: e.target.value })
            }
            type="password"
            required
          />
        </div>
        <div className="input">
          <label>First Name</label>
          <input
            value={newUserDetails.firstName}
            onChange={(e) =>
              setNewUserDetails({
                ...newUserDetails,
                firstName: e.target.value,
              })
            }
            type="text"
            required
          />
        </div>

        <div className="input">
          <label>Last Name</label>
          <input
            value={newUserDetails.lastName}
            onChange={(e) =>
              setNewUserDetails({ ...newUserDetails, lastName: e.target.value })
            }
            type="text"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign-Up
        </button>
      </form>

      <Link to="/login">
        <button className="btn btn-link" id="btn-to-signup">
          <p className="link">Already have an account? Log In</p>
        </button>
      </Link>
    </div>
  );
};

export default SignupForm;
