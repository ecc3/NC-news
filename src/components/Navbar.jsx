import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import Loader from "./Loader";

class Navbar extends Component {
  state = {
    topics: [],
    displayList: false,
    isLoading: true
  };

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  }

  handleClick = event => {
    this.setState(currentState => {
      return { displayList: !currentState.displayList };
    });
  };

  // handleMouseLeave = event => {
  //   this.setState({ displayList: false });
  // };

  render() {
    const { topics, displayList, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <nav>
        <Link to="/articles">
          <button>Articles</button>
        </Link>
        <button
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
      </nav>
    );
  }
}

export default Navbar;
