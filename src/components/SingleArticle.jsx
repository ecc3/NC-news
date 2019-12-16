import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import CommentsList from "./CommentsList";

class SingleArticle extends Component {
  state = {
    article: null,
    isLoading: true,
    commentsVisible: false
  };

  componentDidMount() {
    api.getSingleArticle(this.props.article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  }

  handleViewComments = () => {
    this.setState(currentState => {
      return { commentsVisible: !currentState.commentsVisible };
    });
  };

  render() {
    const { article, isLoading, commentsVisible } = this.state;
    if (isLoading) return <Loader />;
    const { title, body, votes, topic, author } = article;
    return (
      <div>
        <h2>{title}</h2>
        <h5>Written by {author}</h5>
        <p>{body}</p>
        <p>
          Votes: {votes}, Topic: {topic}
        </p>
        <button onClick={this.handleViewComments}>Show/Hide Comments</button>
        {commentsVisible && <CommentsList article_id={this.props.article_id} />}
      </div>
    );
  }
}

export default SingleArticle;
