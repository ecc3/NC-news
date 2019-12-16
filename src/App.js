import React from "react";
import "./App.css";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import { Router } from "@reach/router";
import SingleArticle from "./components/SingleArticle";
import ErrDisplayer from "./components/ErrDisplayer";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Welcome path="/" />
        <ArticlesList path="/articles" />
        <ArticlesList path="/topics/:topic" />
        <SingleArticle path="/articles/:article_id" />
        <ErrDisplayer default err="Page not found" />
      </Router>
    </div>
  );
}

export default App;
