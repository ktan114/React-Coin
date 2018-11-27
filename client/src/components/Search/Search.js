import React, { Component } from "react";

import "./Search.css";
import { API_URL } from "../../config";
import { handleResponse } from "../../helpers";
import Loading from "../Loading/Loading";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
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
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="Search">
        <span className="Search__Icon" />
        <input
          className="Search__Input"
          type="text"
          placeholder="Currency name"
          name="searchQuery"
          onChange={this.handleChange}
        />
        {loading && (
          <div className="Search__Loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
      </div>
    );
  }
}

export default Search;
