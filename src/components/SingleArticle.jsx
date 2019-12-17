import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import CommentsList from "./CommentsList";
import ErrDisplayer from "./ErrDisplayer";
import NewComment from "./NewComment";
import Voter from "./Voter";

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
    try {
      const comment = await api.postNewComment(
        this.props.article_id,
        this.props.username,
        body
      );
      this.setState({
        comments: [comment, ...this.state.comments],
        commentsVisible: true
      });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg });
    }
  };

  render() {
    const { article, isLoading, commentsVisible, err, comments } = this.state;
    if (isLoading) return <Loader />;
    const { title, body, votes, topic, author } = article;
    return (
      <div>
        {err && <ErrDisplayer err={err} />}
        <h2>{title}</h2>
        <h5>Written by {author}</h5>
        <p>{body}</p>
        <p>Topic: {topic}</p>
        <Voter type="articles" id={this.props.article_id} votes={votes} />
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
