import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import Loader from "./Loader";
import ErrDisplayer from "./ErrDisplayer";
import Button from "./Button";

class Navbar extends Component {
  state = {
    topics: [],
    displayList: false,
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

  handleClick = ({ target: { name } }) => {
    this.setState(currentState => {
      return { [name]: !currentState[name] };
    });
  };

  handleShow = event => {
    this.setState({ displayList: true });
  };

  handleMouseLeave = event => {
    this.setState({ displayList: false });
  };

  render() {
    const { topics, displayList, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrDisplayer err={err} />;
    return (
      <nav>
        <Link to="/">
          <Button primary classs="btn">
            <i className="fa fa-home"></i> Home
          </Button>
        </Link>
        <div onMouseOver={this.handleShow} onMouseLeave={this.handleMouseLeave}>
          <Button primary name="displayList" onClick={this.handleClick}>
            Articles
          </Button>
          {displayList && (
            <ul>
              <li>
                <Link to="/articles">View All</Link>
              </li>
              {topics.map(topic => {
                return (
                  <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                    <li>{topic.slug}</li>
                  </Link>
                );
              })}
            </ul>
          )}
        </div>

        {/* <Link to="/articles">
          <Button primary>Articles</Button>
        </Link>
        <div onMouseOver={this.handleShow} onMouseLeave={this.handleMouseLeave}>
          <Button primary name="displayList" onClick={this.handleClick}>
            Topics
          </Button>
          {displayList && (
            <ul>
              {topics.map(topic => {
                return (
                  <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                    <li>{topic.slug}</li>
                  </Link>
                );
              })}
            </ul>
          )}
        </div> */}
        <div className="loggedIn">
          <Button onClick={this.props.handleShowLogin} name="showLogin">
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
