import React, { Component } from "react";
import * as api from "../utils/api";
import Voter from "./Voter";

class CommentCard extends Component {
  state = {
    isDeleted: false
  };

  handleDelete = event => {
    api.deleteComment(this.props.comment_id);
    this.setState({ isDeleted: true });
  };

  render() {
    const { author, votes, body, username } = this.props;
    if (this.state.isDeleted) return <p>Your comment has been deleted.</p>;
    return (
      <div>
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
