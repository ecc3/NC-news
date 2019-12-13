import React from "react";

const ArticleCard = ({ author, title, topic, votes }) => {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{author}</h4>
      <p>{topic}</p>
      <p>{votes}</p>
    </div>
  );
};

export default ArticleCard;
