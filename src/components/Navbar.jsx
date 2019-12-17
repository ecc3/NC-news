import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import Loader from "./Loader";
import ErrDisplayer from "./ErrDisplayer";

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

  // handleMouseLeave = event => {
  //   this.setState({ displayList: false });
  // };

  render() {
    const { topics, displayList, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrDisplayer err={err} />;
    return (
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/articles">
          <button>Articles</button>
        </Link>
        <button
          name="displayList"
          onClick={this.handleClick}
          // onMouseOver={this.handleShow}
          // onMouseLeave={this.handleMouseLeave}
        >
          Topics
        </button>
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
        <button onClick={this.props.handleShowLogin} name="showLogin">
          Login
        </button>
      </nav>
    );
  }
}

export default Navbar;
