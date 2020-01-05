import React, { Component } from "react";
import Loader from "./Loader";
import SmallButton from "./SmallButton";

class NewComment extends Component {
  state = {
    body: "",
    isLoading: false
  };

  handleBodySubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    await this.props.commentUpload(this.state.body);
    this.setState({ body: "", isLoading: false });
  };

  handleBodyInput = ({ target: { value } }) => {
    this.setState({ body: value });
  };

  render() {
    const { body, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div id="newComment">
        <form onSubmit={this.handleBodySubmit} id="commentForm">
          <textarea
            name="body"
            id="textarea"
            value={body}
            onChange={this.handleBodyInput}
            required
          ></textarea>
          <SmallButton primary className="submit">
            Submit
          </SmallButton>
        </form>
      </div>
    );
  }
}

export default NewComment;
