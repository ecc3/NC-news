// import React from "react";
import "./App.css";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import { Router } from "@reach/router";
import SingleArticle from "./components/SingleArticle";
import ErrDisplayer from "./components/ErrDisplayer";
import Welcome from "./components/Welcome";
import React, { Component } from "react";
import * as api from "./utils/api";
import SignIn from "./components/SignIn";

class App extends Component {
  state = {
    user: {
      username: "cooljmessy",
      avatar_url: "https://i.imgur.com/WfX0Neu.jpg",
      name: "Peter Messy"
    },
    err: ""
  };

  updateUser = async username => {
    try {
      const user = await api.getUserByUsername(username);
      this.setState({ user });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg });
    }
  };

  render() {
    const { err, user } = this.state;
    if (err)
      return (
        <div>
          <Header user={user} />
          <ErrDisplayer err={err} />
        </div>
      );
    return (
      <div className="App">
        <Header user={user} />
        <Router>
          <Welcome path="/" />
          <ArticlesList path="/articles" />
          <ArticlesList path="/topics/:topic" />
          <SignIn path="/login" updateUser={this.updateUser} />
          <SingleArticle path="/articles/:article_id" />
          <ErrDisplayer default err="Page not found" />
        </Router>
      </div>
    );
  }
}

export default App;
