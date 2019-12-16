import React from "react";
import CommentCard from "./CommentCard";

const CommentsList = props => {
  return (
    <div>
      {props.comments.map(comment => {
        return <CommentCard {...comment} key={comment.comment_id} />;
      })}
    </div>
  );
};

export default CommentsList;
