import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";

class Navbar extends Component {
  state = {
    topics: [],
    displayList: false
  };

  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics });
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
    const { topics, displayList } = this.state;
    return (
      <nav>
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
