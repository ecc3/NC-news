import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import ErrDisplayer from "./ErrDisplayer";

class Welcome extends Component {
  state = {
    articles: [],
    err: ""
  };

  componentDidMount = async () => {
    if (this.state.articles.length === 0) {
      try {
        const articles = await api.getAllArticles(undefined, "votes");
        this.setState({ articles });
      } catch ({ response: { data } }) {
        this.setState({ err: data.msg });
      }
    }
  };

  render() {
    const { articles, err } = this.state;
    if (err)
      return (
        <div>
          <h1>NC-news</h1>
          <h3>Get all your news!</h3>
          <ErrDisplayer err={err} />;
        </div>
      );
    return (
      <div>
        <h1>NC-news</h1>
        <h3>Get all your news!</h3>
        <ArticleCard
          {...articles[Math.floor(Math.random() * articles.length)]}
        />
        <ArticleCard
          {...articles[Math.floor(Math.random() * articles.length)]}
        />
        <ArticleCard
          {...articles[Math.floor(Math.random() * articles.length)]}
        />
      </div>
    );
  }
}

export default Welcome;
