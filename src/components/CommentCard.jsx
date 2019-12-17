import React, { Component } from "react";
import * as api from "../utils/api";

class CommentCard extends Component {
  state = {
    isDeleted: false
  };

  handleDelete = event => {
    api.deleteComment(this.props.comment_id);
    this.setState({ isDeleted: true });
  };

  render() {
    const { author, votes, body, username } = this.props;
    if (this.state.isDeleted) return <p>Your comment has been deleted.</p>;
    return (
      <div>
        <h5>{author}</h5>
        <p>{body}</p>
        <p>Votes: {votes}</p>
        {author === username && (
          <button onClick={this.handleDelete}>Delete</button>
        )}
      </div>
    );
  }
}

export default CommentCard;

// import React from "react";

// const CommentCard = ({ author, votes, body, username }) => {
//   return (
//     <div>
//       <h5>{author}</h5>
//       <p>{body}</p>
//       <p>Votes: {votes}</p>
//       {author === username && <button>Delete</button>}
//     </div>
//   );
// };

// export default CommentCard;
