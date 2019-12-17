import React, { Component } from "react";
import Loader from "./Loader";

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
      <div>
        <form onSubmit={this.handleBodySubmit}>
          <textarea
            name="body"
            id=""
            cols="60"
            rows="5"
            value={body}
            onChange={this.handleBodyInput}
            required
          ></textarea>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewComment;
