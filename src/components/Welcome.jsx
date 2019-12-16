import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";

class Welcome extends Component {
  state = {
    articles: []
  };

  componentDidMount = async () => {
    if (this.state.articles.length === 0) {
      const articles = await api.getAllArticles(undefined, "votes");
      this.setState({ articles });
    }
  };

  render() {
    const { articles } = this.state;
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

// import React from "react";

// const Welcome = () => {
//   return <div></div>;
// };

// export default Welcome;
