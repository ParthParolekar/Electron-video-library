import React, { useState } from "react";
import bigLogo from "../../assets/20220206_152352.png";
import logo from "../../assets/20220203_122320.png";

import { Link } from "react-router-dom";
import { useAuth } from "../../Context";

const Navbar = ({ userLoggedIn }) => {
  const [navLinksVisible, setNavLinksVisible] = useState(false);
  const [, dispatch] = useAuth();

  const loggedOutUser = {
    foundUser: {
      _id: null,
      firstName: null,
      lastName: null,
      email: null,
      id: null,
    },
    encodedToken: null,
  };

  const logOutHandler = () => {
    dispatch({ type: "HANDLE_USER_AUTH", payload: loggedOutUser });
    localStorage.removeItem("jwt");
  };

  return (
    <nav className="navigation flex-row space-between align-center">
      <div className="left-navigation flex-row align-center">
        <i
          onClick={() => setNavLinksVisible(!navLinksVisible)}
          className="fas fa-bars hamburger"
          id="hamburger"
        ></i>

        <Link to="/">
          <img src={bigLogo} className="big-logo" alt="logo" />
        </Link>
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
      </div>

      <div
        className={
          navLinksVisible === false
            ? "nav-links nav-links-not-visible"
            : "nav-links nav-links-visible"
        }
      >
        <Link onClick={() => setNavLinksVisible(false)} className="link" to="/">
          Browse
        </Link>
        <Link
          onClick={() => setNavLinksVisible(false)}
          className="link"
          to="/playlists"
        >
          Playlists
        </Link>
        <Link
          onClick={() => setNavLinksVisible(false)}
          className="link"
          to="/watchlater"
        >
          Watch Later
        </Link>
        <Link
          onClick={() => setNavLinksVisible(false)}
          className="link"
          to="/likedvideos"
        >
          Liked Videos
        </Link>
        <Link
          onClick={() => setNavLinksVisible(false)}
          className="link"
          to="/history"
        >
          History
        </Link>
      </div>

      <div className="right-navigation navigation-icons flex-row align-center">
        {!userLoggedIn ? (
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        ) : (
          <button onClick={logOutHandler} className="btn btn-primary">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
