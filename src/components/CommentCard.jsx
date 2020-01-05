import React, { Component } from "react";
import * as api from "../utils/api";
import Voter from "./Voter";
import ErrDisplayer from "./ErrDisplayer";
import Button from "./Button";

class CommentCard extends Component {
  state = {
    isDeleted: false,
    err: ""
  };

  handleDelete = async () => {
    try {
      await api.deleteComment(this.props.comment_id);
      this.setState({ isDeleted: true });
      this.props.updateCommentDeleted();
    } catch (error) {
      this.setState({
        err: "Your comment could not be deleted. Please try again."
      });
    }
  };

  render() {
    const { author, votes, body, username } = this.props;
    const { isDeleted, err } = this.state;
    if (isDeleted) return <p>Your comment has been deleted.</p>;
    return (
      <div className="comment">
        {err && <ErrDisplayer err={err} />}
        <h4 className="author">{author}</h4>
        <p className="articleBody">{body}</p>
        <Voter type="comments" id={this.props.comment_id} votes={votes} />
        {author === username && (
          <Button primary onClick={this.handleDelete} className="deleteBtn">
            <i class="fas fa-trash-alt"></i> Delete
          </Button>
        )}
      </div>
    );
  }
}

export default CommentCard;
