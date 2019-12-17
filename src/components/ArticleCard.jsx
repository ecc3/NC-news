import React from "react";
import { Link } from "@reach/router";
import Voter from "./Voter";

const ArticleCard = ({
  author,
  title,
  topic,
  votes,
  article_id,
  comment_count,
  created_at
}) => {
  return (
    <div>
      <Link to={`/articles/${article_id}`}>
        <h3>{title}</h3>
      </Link>
      <h4>{author}</h4>
      <h4>{created_at}</h4>
      <p>{topic}</p>
      <p>Comments: {comment_count}</p>
      <Voter type="articles" id={article_id} votes={votes} />
    </div>
  );
};

export default ArticleCard;
