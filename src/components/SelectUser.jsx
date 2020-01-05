import React, { Component } from "react";
import Input from "./Input";

class SelectUser extends Component {
  state = {
    users: [
      "weegembump",
      "happyamy2016",
      "jessjelly",
      "grumpy19",
      "tickle122",
      "cooljmessy"
    ],
    search: "",
    suggestions: [
      "weegembump",
      "happyamy2016",
      "jessjelly",
      "grumpy19",
      "tickle122",
      "cooljmessy"
    ]
  };

  handleSearch = event => {
    this.setState({ search: event.target.value }, () => {
      this.setState(currentState => {
        const suggestions = currentState.users.filter(suggestion => {
          return suggestion.includes(currentState.search);
        });
        return { suggestions };
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSelectedUser(this.state.search);
  };

  render() {
    const { search, suggestions } = this.state;
    return (
      <form onSubmit={this.handleSubmit} id="loginForm">
        <Input
          primary
          type="text"
          list="userSuggestions"
          value={search}
          onChange={this.handleSearch}
          placeholder="Username"
        />
        <datalist id="userSuggestions">
          {suggestions.map(suggestion => {
            return <option value={suggestion} key={suggestion} />;
          })}
        </datalist>
        <Input type="submit" className="button" />
      </form>
    );
  }
}

export default SelectUser;
