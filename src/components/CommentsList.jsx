import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import CommentCard from "./CommentCard";
import ErrDisplayer from "./ErrDisplayer";

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    err: ""
  };

  componentDidMount = async () => {
    try {
      const comments = await api.getAllComments(this.props.article_id);
      this.setState({ comments, isLoading: false });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg, isLoading: false });
    }
  };

  render() {
    const { comments, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrDisplayer err={err} />;
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
