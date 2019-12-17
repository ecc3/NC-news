import React, { Component } from "react";
import ErrDisplayer from "./ErrDisplayer";

class SignIn extends Component {
  state = {
    username: "",
    err: ""
  };

  handleSignIn = async event => {
    event.preventDefault();
    try {
      await this.props.updateUser(this.state.username);
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg });
    }
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ username: value });
  };

  render() {
    const { username, err } = this.state;
    return (
      <div id="loginModal">
        <button
          className="close"
          name="showLogin"
          onClick={this.props.handleShowLogin}
        >
          &times;
        </button>
        <form action="" onSubmit={this.handleSignIn}>
          <input type="text" onChange={this.handleInput} value={username} />
          <button>Login</button>
        </form>
        {err && <ErrDisplayer err={err} />}
      </div>
    );
  }
}

export default SignIn;
