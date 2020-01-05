import React, { Component } from "react";
import ErrDisplayer from "./ErrDisplayer";
import SmallButton from "./SmallButton";
import Input from "./Input";

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
      <div className="overlay">
        <div id="loginModal">
          <SmallButton
            className="close"
            name="showLogin"
            onClick={this.props.handleShowLogin}
          >
            &times;
          </SmallButton>
          <form action="" onSubmit={this.handleSignIn} id="loginForm">
            <Input type="text" onChange={this.handleInput} value={username} />
            <SmallButton primary className="button">
              Login
            </SmallButton>
          </form>
          {err && <ErrDisplayer err={err} />}
        </div>
      </div>
    );
  }
}

export default SignIn;
