import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import CommentsList from "./CommentsList";
import ErrDisplayer from "./ErrDisplayer";
import NewComment from "./NewComment";

class SingleArticle extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    commentsVisible: false,
    err: ""
  };

  componentDidMount = async () => {
    try {
      const [article, comments] = await Promise.all([
        api.getSingleArticle(this.props.article_id),
        api.getAllComments(this.props.article_id)
      ]);
      this.setState({ article, comments, isLoading: false });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg, isLoading: false });
    }
  };

  handleViewComments = () => {
    this.setState(currentState => {
      return { commentsVisible: !currentState.commentsVisible };
    });
  };

  commentUpload = async body => {
    const comment = await api.postNewComment(
      this.props.article_id,
      this.props.username,
      body
    );
    this.setState({ comments: [comment, ...this.state.comments] });
  };

  render() {
    const { article, isLoading, commentsVisible, err, comments } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrDisplayer err={err} />;
    const { title, body, votes, topic, author } = article;
    return (
      <div>
        <h2>{title}</h2>
        <h5>Written by {author}</h5>
        <p>{body}</p>
        <p>
          Votes: {votes}, Topic: {topic}
        </p>
        <NewComment commentUpload={this.commentUpload} />
        <button onClick={this.handleViewComments}>Show/Hide Comments</button>
        {commentsVisible && (
          <CommentsList
            comments={comments}
            article_id={this.props.article_id}
            username={this.props.username}
          />
        )}
      </div>
    );
  }
}

export default SingleArticle;
