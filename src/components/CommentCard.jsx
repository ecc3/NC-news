import React, { Component } from "react";
import * as api from "../utils/api";
import Voter from "./Voter";
import ErrDisplayer from "./ErrDisplayer";

class CommentCard extends Component {
  state = {
    isDeleted: false,
    err: ""
  };

  handleDelete = async event => {
    try {
      await api.deleteComment(this.props.comment_id);
      this.setState({ isDeleted: true });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg });
    }
  };

  render() {
    const { author, votes, body, username } = this.props;
    const { isDeleted, err } = this.state;
    if (isDeleted) return <p>Your comment has been deleted.</p>;
    return (
      <div>
        {err && <ErrDisplayer err={err} />}
        <h5>{author}</h5>
        <p>{body}</p>
        <Voter type="comments" id={this.props.comment_id} votes={votes} />
        {author === username && (
          <button onClick={this.handleDelete}>Delete</button>
        )}
      </div>
    );
  }
}

export default CommentCard;
