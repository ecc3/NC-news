import React, { Component } from "react";

class SignIn extends Component {
  state = {
    username: ""
  };

  handleSignIn = event => {
    event.preventDefault();
    this.props.updateUser(this.state.username);
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ username: value });
  };

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSignIn}>
          <input
            type="text"
            onChange={this.handleInput}
            value={this.state.username}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
