import React from "react";
import CommentCard from "./CommentCard";

const CommentsList = props => {
  return (
    <div>
      {props.comments.map(comment => {
        return (
          <div key={comment.comment_id}>
            <CommentCard {...comment} username={props.username} />
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
