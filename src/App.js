import React from "react";
import "./App.css";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import { Router } from "@reach/router";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <ArticlesList path="/articles" />
        <ArticlesList path="/topics/:topic" />
        <SingleArticle path="/articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
