import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import Loader from "./Loader";
import ErrDisplayer from "./ErrDisplayer";
import Button from "./Button";
import DropDownMenu from "./DropDownMenu";

class Navbar extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: ""
  };

  componentDidMount = async () => {
    try {
      const topics = await api.getTopics();
      this.setState({ topics, isLoading: false });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg, isLoading: false });
    }
  };

  render() {
    const { topics, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrDisplayer err={err} />;
    return (
      <nav>
        <Link to="/">
          <Button primary className="btn">
            <i className="fa fa-home"></i> Home
          </Button>
        </Link>
        <DropDownMenu topics={topics} />
        <div className="loggedIn">
          <Button primary onClick={this.props.handleShowLogin} name="showLogin">
            Login
          </Button>
          <p>
            <b>Hi {this.props.user.name.split(" ")[0]}</b>
          </p>
          <img
            src={this.props.user.avatar_url}
            alt="user's avatar"
            id="userImage"
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
