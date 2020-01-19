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
import Loader from "./components/Loader";

class App extends Component {
  state = {
    user: {
      username: "cooljmessy",
      avatar_url: "https://i.imgur.com/WfX0Neu.jpg",
      name: "Peter Messy"
    },
    showLogin: false,
    welcomeIsLoading: false,
    navbarIsLoading: true
  };

  componentDidMount = () => {
    if (localStorage.getItem("currentUser")) {
      const parsedUser = JSON.parse(localStorage.getItem("currentUser"));
      this.setState({ user: parsedUser });
    }
  };

  updateUser = async username => {
    const user = await api.getUserByUsername(username);
    this.setState({ user, showLogin: false });
    const stringifiedUser = JSON.stringify(user);
    localStorage.setItem("currentUser", stringifiedUser);
    return;
  };

  handleShowLogin = ({ target: { name } }) => {
    this.setState(currentState => {
      return { [name]: !currentState[name] };
    });
  };

  hasLoaded = (component, bool = false) => {
    this.setState({ [`${component}IsLoading`]: bool });
  };

  render() {
    const { user, showLogin, welcomeIsLoading, navbarIsLoading } = this.state;
    return (
      <div className="App">
        <Navbar
          handleShowLogin={this.handleShowLogin}
          user={user}
          hasLoaded={this.hasLoaded}
        />
        {(navbarIsLoading || welcomeIsLoading) && <Loader />}
        <Header />
        {showLogin && (
          <SignIn
            handleShowLogin={this.handleShowLogin}
            updateUser={this.updateUser}
          />
        )}
        <div className="router">
          <Router>
            <Welcome path="/" hasLoaded={this.hasLoaded} />
            <ArticlesList path="/articles" />
            <ArticlesList path="/topics/:topic" />
            <SingleArticle
              path="/articles/:article_id"
              username={user.username}
            />
            <ErrDisplayer default err="Page not found" />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
