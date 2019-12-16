import React from "react";
import { Link } from "@reach/router";

const ArticleCard = ({ author, title, topic, votes, article_id }) => {
  return (
    <div>
      <Link to={`/articles/${article_id}`}>
        <h3>{title}</h3>
      </Link>
      <h4>{author}</h4>
      <p>{topic}</p>
      <p>{votes}</p>
    </div>
  );
};

export default ArticleCard;
