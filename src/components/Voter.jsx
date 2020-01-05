import React, { Component } from "react";
import * as api from "../utils/api";
import ErrDisplayer from "./ErrDisplayer";

class Voter extends Component {
  state = {
    optimisticVote: 0,
    err: ""
  };

  handleClick = async ({ target: { name } }) => {
    try {
      this.setState(currentState => {
        return { optimisticVote: currentState.optimisticVote + +name };
      });
      await api.patchVotes(this.props.type, this.props.id, name);
    } catch (error) {
      this.setState({
        err:
          "Your vote could not be added. Please refresh the page and try again."
      });
    }
  };

  render() {
    const { optimisticVote, err } = this.state;
    return (
      <div className="voter">
        <button
          className="arrow"
          onClick={this.handleClick}
          name="1"
          disabled={optimisticVote > 0}
        >
          <i className="fa fa-arrow-up"></i>
        </button>
        <p>Votes: {this.props.votes + optimisticVote}</p>
        <button
          className="arrow"
          onClick={this.handleClick}
          name="-1"
          disabled={optimisticVote < 0}
        >
          <i className="fa fa-arrow-down"></i>
        </button>
        {err && <ErrDisplayer err={err} />}
      </div>
    );
  }
}

export default Voter;
