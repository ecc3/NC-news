import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import ErrDisplayer from "./ErrDisplayer";

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    err: ""
  };

  componentDidMount = async () => {
    try {
      const articles = await api.getAllArticles(this.props.topic);
      this.setState({ articles, isLoading: false });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg, isLoading: false });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      try {
        const articles = await api.getAllArticles(
          this.props.topic,
          this.state.sort_by,
          this.state.order
        );
        this.setState({ articles });
      } catch ({ response: { data } }) {
        this.setState({ err: data.msg, isLoading: false });
      }
    }
  };

  handleSelect = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { articles, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrDisplayer err={err} />;
    return (
      <div>
        <p>
          Sort by:{" "}
          <select name="sort_by" id="" onChange={this.handleSelect}>
            <option value="created_at">Most recent</option>
            <option value="comment_count">Most comments</option>
            <option value="votes">Most popular</option>
          </select>
        </p>
        <p>
          Order:{" "}
          <select name="order" id="" onChange={this.handleSelect}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </p>
        {articles.map(article => {
          return <ArticleCard {...article} key={article.article_id} />;
        })}
      </div>
    );
  }
}

export default ArticlesList;
