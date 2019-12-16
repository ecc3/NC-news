import React from "react";

const CommentCard = ({ author, votes, body }) => {
  return (
    <div>
      <h5>{author}</h5>
      <p>{body}</p>
      <p>Votes: {votes}</p>
    </div>
  );
};

export default CommentCard;
