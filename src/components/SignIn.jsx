import React, { Component } from "react";
import ErrDisplayer from "./ErrDisplayer";
import SmallButton from "./SmallButton";
import SelectUser from "./SelectUser";

class SignIn extends Component {
  state = {
    err: ""
  };

  handleSignIn = async user => {
    try {
      await this.props.updateUser(user);
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg });
    }
  };

  render() {
    const { err } = this.state;
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
          <SelectUser handleSelectedUser={this.handleSignIn} />
          {err && <ErrDisplayer err={err} />}
        </div>
      </div>
    );
  }
}

export default SignIn;
