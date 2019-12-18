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
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    user: {
      username: "cooljmessy",
      avatar_url: "https://i.imgur.com/WfX0Neu.jpg",
      name: "Peter Messy"
    },
    showLogin: false
  };

  updateUser = async username => {
    const user = await api.getUserByUsername(username);
    this.setState({ user, showLogin: false });
    return;
  };

  handleShowLogin = ({ target: { name } }) => {
    this.setState(currentState => {
      return { [name]: !currentState[name] };
    });
  };

  render() {
    const { user, showLogin } = this.state;
    return (
      <div className="App">
        <Navbar handleShowLogin={this.handleShowLogin} user={user} />
        <Header />
        {showLogin && (
          <SignIn
            handleShowLogin={this.handleShowLogin}
            updateUser={this.updateUser}
          />
        )}
        <Router>
          <Welcome path="/" />
          <ArticlesList path="/articles" />
          <ArticlesList path="/topics/:topic" />
          <SingleArticle
            path="/articles/:article_id"
            username={user.username}
          />
          <ErrDisplayer default err="Page not found" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
