import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at"
  };

  componentDidMount() {
    api.getAllArticles(this.props.topic).then(articles => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sort_by !== this.state.sort_by
    ) {
      api
        .getAllArticles(this.props.topic, this.state.sort_by)
        .then(articles => {
          this.setState({ articles });
        });
    }
  }

  handleSelect = ({ target: { value } }) => {
    this.setState({ sort_by: value });
  };

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div>
        <p>Sort by: </p>
        <select name="" id="" onChange={this.handleSelect}>
          <option value="created_at">Most recent</option>
          <option value="comment_count">Most comments</option>
          <option value="votes">Most popular</option>
        </select>
        {articles.map(article => {
          return <ArticleCard {...article} key={article.article_id} />;
        })}
      </div>
    );
  }
}

export default ArticlesList;
