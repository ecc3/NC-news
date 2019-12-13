import React from "react";
import "./App.css";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";

function App() {
  return (
    <div className="App">
      <Header />
      <ArticlesList />
    </div>
  );
}

export default App;
