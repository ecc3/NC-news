import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import CommentCard from "./CommentCard";

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    api.getAllComments(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false });
    });
  }

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div>
        {comments.map(comment => {
          return <CommentCard {...comment} key={comment.comment_id} />;
        })}
      </div>
    );
  }
}

export default CommentsList;
