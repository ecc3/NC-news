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
      await api.patchVotes(this.props.type, this.props.id, name);
      this.setState(currentState => {
        return { optimisticVote: currentState.optimisticVote + +name };
      });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg });
    }
  };

  render() {
    const { optimisticVote, err } = this.state;
    return (
      <div>
        <p>Votes: {this.props.votes + optimisticVote}</p>
        <button
          onClick={this.handleClick}
          name="1"
          disabled={optimisticVote > 0}
        >
          Up
        </button>
        <button
          onClick={this.handleClick}
          name="-1"
          disabled={optimisticVote < 0}
        >
          Down
        </button>
        {err && <ErrDisplayer err={err} />}
      </div>
    );
  }
}

export default Voter;
