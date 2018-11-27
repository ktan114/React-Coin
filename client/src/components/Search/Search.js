import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./Search.css";
import { API_URL } from "../../config";
import { handleResponse } from "../../helpers";
import Loading from "../Loading/Loading";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchResults: [],
      loading: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (!e.target.value) return "";
    this.setState({ loading: true });
    fetch(`${API_URL}/autocomplete?searchQuery=${e.target.value}`)
      .then(handleResponse)
      .then(result => {
        this.setState({ loading: false, searchResults: result });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderSearchResults = () => {
    const { searchResults, searchQuery, loading } = this.state;

    if (!searchQuery) return "";

    if (searchResults.length > 0) {
      return (
        <div className="Search__Result__Container">
          {searchResults.map(result => (
            <div
              key={result.id}
              className="Search__Result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol}){" "}
            </div>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className="Search__Result__Container">
          <div className="Search__No__Result">No results found.</div>
        </div>
      );
    }
  };

  handleRedirect = currencyId => {
    // Clear input value and close autocomplete container, by clearing searchQuery state
    this.setState({
      searchQuery: "",
      searchResults: []
    });

    this.props.history.push(`/currency/${currencyId}`);
  };

  render() {
    const { loading, searchQuery } = this.state;
    return (
      <div className="Search">
        <span className="Search__Icon" />
        <input
          className="Search__Input"
          type="text"
          placeholder="Currency name"
          name="searchQuery"
          value={searchQuery}
          onChange={this.handleChange}
        />
        {loading && (
          <div className="Search__Loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default withRouter(Search);
