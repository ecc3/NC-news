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
    <div className="card">
      <Link to={`/articles/${article_id}`} className="link">
        <h2>{title}</h2>
      </Link>
      <span className="metadata2">
        <p>Comments: {comment_count}</p>
        <p>Topic: {topic}</p>
      </span>
      <span className="metadata1">
        <p>
          Written by {author} and posted on {created_at}
          {/* .slice(0, 10) */}
        </p>
      </span>
      <Voter type="articles" id={article_id} votes={votes} />
    </div>
  );
};

export default ArticleCard;
