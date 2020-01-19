import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import ErrDisplayer from "./ErrDisplayer";

class Welcome extends Component {
  state = {
    articles: [],
    articleNum: 0,
    isLoading: true,
    err: ""
  };

  componentDidMount = async () => {
    this.props.hasLoaded("welcome", true);
    if (this.state.articles.length === 0) {
      try {
        const articles = await api.getAllArticles(undefined, "votes");
        const articleNum = Math.floor(Math.random() * (articles.length - 2));
        this.setState({ articles, articleNum, isLoading: false });
      } catch ({ response: { data } }) {
        this.setState({ err: data.msg });
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isLoading !== this.state.isLoading) {
      this.props.hasLoaded("welcome");
    }
  };

  render() {
    const { articles, err, articleNum, isLoading } = this.state;
    if (isLoading) return <section className="loading"></section>;
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
        <img
          id="home-image"
          src="images/home-image.jpg"
          alt="grandmother and grandson talking in field with laptop"
        />
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
