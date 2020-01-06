import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import ErrDisplayer from "./ErrDisplayer";
import Button from "./Button";
import DropDownMenu from "./DropDownMenu";

class Navbar extends Component {
  state = {
    topics: [],
    width: window.innerWidth,
    displayMenu: false,
    isLoading: true,
    err: ""
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount = async () => {
    try {
      const topics = await api.getTopics();
      this.setState({ topics, isLoading: false });
    } catch ({ response: { data } }) {
      this.setState({ err: data.msg, isLoading: false });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isLoading !== this.state.isLoading) {
      this.props.hasLoaded("navbar");
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  handleMenuDisplay = () => {
    this.setState(currentState => {
      return { displayMenu: !currentState.displayMenu };
    });
  };

  render() {
    const { topics, isLoading, err, width, displayMenu } = this.state;
    if (isLoading) return <section className="loading"></section>;
    if (width < 500) {
      console.log(width, "less that 400");
      return (
        <nav>
          <Link to="/">
            <Button primary>
              <i className="fa fa-home"></i> Home
            </Button>
          </Link>
          <Button primary onClick={this.handleMenuDisplay}>
            <p id="hi">Hi {this.props.user.name.split(" ")[0]}</p>
            <i class="fas fa-bars" id="burger"></i>
          </Button>
          {displayMenu && (
            <div id="displayMenu">
              <Link to="/articles" className="mobSpan">
                all topics
              </Link>
              {topics.map(topic => {
                return (
                  <Link
                    to={`/topics/${topic.slug}`}
                    key={topic.slug}
                    className="mobSpan"
                  >
                    {topic.slug}
                  </Link>
                );
              })}
              <a
                className="mobSpan"
                onClick={this.props.handleShowLogin}
                name="showLogin"
              >
                login
              </a>
              {/* <Button
                className="mobSpan"
                primary
                onClick={this.props.handleShowLogin}
                name="showLogin"
              >
                Login
              </Button> */}
            </div>
          )}
        </nav>
      );
    }
    if (err) return <ErrDisplayer err={err} />;
    return (
      <nav>
        <Link to="/">
          <Button primary>
            <i className="fa fa-home"></i> Home
          </Button>
        </Link>
        <DropDownMenu topics={topics} />
        <div className="loggedIn">
          <Button primary onClick={this.props.handleShowLogin} name="showLogin">
            Login
          </Button>
          <p>Hi {this.props.user.name.split(" ")[0]}</p>
          <img
            src={this.props.user.avatar_url}
            alt="user's avatar"
            id="userImage"
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
