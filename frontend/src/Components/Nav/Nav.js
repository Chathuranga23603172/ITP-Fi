import React from "react";
import "./Nav.css";
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul>
        <li><Link to ="/mainhome">
          <h1>Home</h1></Link>
        </li>
        <li><Link to ="/adduser">
          <h1>ADD user</h1></Link>
        </li>
        <li><Link to ="/userdetails">
          <h1>User details</h1></Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
