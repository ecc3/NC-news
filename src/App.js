import React from "react";
import "./App.css";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <ArticlesList path="/articles" />
        <ArticlesList path="/topics/:topic" />
      </Router>
    </div>
  );
}

export default App;
