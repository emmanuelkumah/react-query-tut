import React from "react";
import "../../src/App.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <nav className="navContainer">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/form">Add User</Link>
          </li>
        </ul>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
