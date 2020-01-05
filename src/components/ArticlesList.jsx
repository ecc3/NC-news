import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import ErrDisplayer from "./ErrDisplayer";
import SelectUser from "./SelectUser";
import Select from "./Select";

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
        this.setState({ isLoading: true });
        const articles = await api.getAllArticles(
          this.props.topic,
          this.state.sort_by,
          this.state.order
        );
        this.setState({ articles, isLoading: false, err: "" });
      } catch ({ response: { data } }) {
        this.setState({ err: data.msg, isLoading: false });
      }
    }
  };

  handleSelect = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  filterByAuthor = async username => {
    try {
      this.setState({ isLoading: true });
      const articles = await api.getAllArticles(
        this.props.topic,
        this.state.sort_by,
        this.state.order,
        username
      );
      this.setState({ articles, isLoading: false, err: "" });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg, isLoading: false });
    }
  };

  render() {
    const { articles, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div className="route">
        <div className="content">
          <div className="filters">
            <p>
              Sort by:{" "}
              <Select name="sort_by" id="" onChange={this.handleSelect}>
                <option value="created_at">Most recent</option>
                <option value="comment_count">Most comments</option>
                <option value="votes">Most popular</option>
              </Select>
            </p>
            <p>
              Order:{" "}
              <Select name="order" id="" onChange={this.handleSelect}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </Select>
            </p>
            <div>
              <p>Search By Author: </p>
              <SelectUser handleSelectedUser={this.filterByAuthor} />
            </div>
          </div>
          {err && <ErrDisplayer err={err} />}
          {!err &&
            articles.map(article => {
              return <ArticleCard {...article} key={article.article_id} />;
            })}
        </div>
      </div>
    );
  }
}

export default ArticlesList;
