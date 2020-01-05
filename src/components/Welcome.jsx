import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import ErrDisplayer from "./ErrDisplayer";

class Welcome extends Component {
  state = {
    articles: [],
    articleNum: 0,
    err: ""
  };

  componentDidMount = async () => {
    if (this.state.articles.length === 0) {
      try {
        const articles = await api.getAllArticles(undefined, "votes");
        const articleNum = Math.floor(Math.random() * (articles.length - 2));
        this.setState({ articles, articleNum });
      } catch ({ response: { data } }) {
        this.setState({ err: data.msg });
      }
    }
  };

  render() {
    const { articles, err, articleNum } = this.state;
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
        <h3>Recommended for you:</h3>
        <div className="articlesContainer">
          <ArticleCard {...articles[articleNum]} />
          <ArticleCard {...articles[articleNum + 2]} />
          <ArticleCard {...articles[articleNum + 1]} />
        </div>
      </div>
    );
  }
}

export default Welcome;
