import React from "react";
import Navbar from "./Navbar";

const Header = props => {
  return (
    <div>
      <h1>Welcome to NC News</h1>
      <p>User: {props.user.name}</p>
      <img src={props.user.avatar_url} alt="user's avatar" />
      <Navbar />
    </div>
  );
};

export default Header;
