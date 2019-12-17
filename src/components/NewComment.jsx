import React, { Component } from "react";

class NewComment extends Component {
  state = {
    body: ""
  };

  handleBodySubmit = async event => {
    event.preventDefault();
    await this.props.commentUpload(this.state.body);
    this.setState({ body: "" });
  };

  handleBodyInput = event => {
    this.setState({ body: event.target.value }, () => {});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleBodySubmit}>
          <textarea
            name="body"
            id=""
            cols="60"
            rows="5"
            value={this.state.body}
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
