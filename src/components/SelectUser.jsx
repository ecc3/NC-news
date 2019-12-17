import React, { Component } from "react";

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
        const newSuggestions = currentState.users.filter(suggestion => {
          return suggestion.includes(currentState.search);
        });
        return { suggestions: newSuggestions };
      });
    });
  };

  handleSelect = ({ target: { value } }) => {
    this.setState({ search: value }, () => {
      this.props.filterByAuthor(this.state.search);
    });
  };

  handleSubmit = event => {};

  render() {
    const { search, suggestions } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={this.handleSearch}
          placeholder="Author"
        />
        <select onChange={this.handleSelect}>
          {suggestions.map(suggestion => {
            return (
              <option value={suggestion} key={suggestion}>
                {suggestion}
              </option>
            );
          })}
        </select>
      </form>
    );
  }
}

export default SelectUser;
