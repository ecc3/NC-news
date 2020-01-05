import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import ErrDisplayer from "./ErrDisplayer";
import SelectUser from "./SelectUser";
import Select from "./Select";
import Button from "./Button";

class ArticlesList extends Component {
  state = {
    articles: [],
    username: "",
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    searchErr: "",
    loadErr: ""
  };

  componentDidMount = async () => {
    try {
      const articles = await api.getAllArticles(this.props.topic);
      this.setState({ articles, isLoading: false });
    } catch ({ response: { data } }) {
      this.setState({ loadErr: "Page not foudn", isLoading: false });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order ||
      prevState.username !== this.state.username
    ) {
      try {
        this.setState({ isLoading: true });
        const articles = await api.getAllArticles(
          this.props.topic,
          this.state.sort_by,
          this.state.order,
          this.state.username
        );
        this.setState({ articles, isLoading: false, err: "" });
      } catch ({ response: { data } }) {
        this.setState({
          searchErr: "Search not found",
          isLoading: false
        });
      }
    }
  };

  handleSelect = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
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
      this.setState({ articles, username, isLoading: false, err: "" });
    } catch ({ response: { data } }) {
      this.setState({
        searchErr: "Search not found",
        username: "",
        isLoading: false
      });
    }
  };

  render() {
    const {
      articles,
      isLoading,
      searchErr,
      loadErr,
      sort_by,
      order,
      username
    } = this.state;
    if (loadErr) return <ErrDisplayer err={loadErr} />;
    return (
      <div className="route">
        <div className="content">
          <div className="filters">
            <p>
              Sort by:{" "}
              <Select
                name="sort_by"
                id=""
                onChange={this.handleSelect}
                value={sort_by}
              >
                <option value="created_at">Date posted</option>
                <option value="comment_count">Comments</option>
                <option value="votes">Popularity</option>
              </Select>
            </p>
            <p>
              Order:{" "}
              <Select
                name="order"
                id=""
                onChange={this.handleSelect}
                value={order}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </Select>
            </p>
            <div>
              <p>Search By Author: </p>
              <SelectUser handleSelectedUser={this.filterByAuthor} />
            </div>
          </div>
          {username && (
            <Button
              primary
              onClick={this.handleSelect}
              name="username"
              value=""
            >
              <span className="close">&times;</span>
              Articles by {username}
            </Button>
          )}
          {searchErr && <ErrDisplayer err={searchErr} />}
          {isLoading && <Loader />}
          {!searchErr &&
            !isLoading &&
            articles.map(article => {
              return <ArticleCard {...article} key={article.article_id} />;
            })}
        </div>
      </div>
    );
  }
}

export default ArticlesList;
