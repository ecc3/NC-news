import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";

class ArticlesList extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    api.getAllArticles().then(articles => {
      this.setState({ articles });
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <div>
        {articles.map(article => {
          return <ArticleCard {...article} key={article.article_id} />;
        })}
      </div>
    );
  }
}

export default ArticlesList;
