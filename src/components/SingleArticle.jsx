import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";

class SingleArticle extends Component {
  state = {
    article: null,
    isLoading: true
  };

  componentDidMount() {
    api.getSingleArticle(this.props.id).then(article => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const { article, isLoading } = this.state;
    const { title, body, votes, topic, author } = article;
    if (isLoading) return <Loader />;
    return (
      <div>
        <h2>{title}</h2>
        <h5>Written by {author}</h5>
        <p>{body}</p>
        <p>
          Votes: {votes}, Topic: {topic}
        </p>
      </div>
    );
  }
}

export default SingleArticle;
