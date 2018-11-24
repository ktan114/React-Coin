import React, { Component } from "react";

import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import Loading from "../Loading/Loading";
import Table from "./Table";
class List extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch(API_URL + "/cryptocurrencies?page=1&perPage=20")
      .then(handleResponse)
      .then(data => {
        this.setState({ loading: false, currencies: data.currencies });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
      });
  }

  renderChangePercent = percent => {
    if (percent > 0)
      return <span className="Percent__Raised">{percent}% &uarr;</span>;
    else if (percent < 0)
      return <span className="Percent__Fallen">{percent}% &darr;</span>;
    else return <span>{percent}</span>;
  };

  render() {
    const { loading, error, currencies } = this.state;

    // Render occurs only when loading component, if loading state is set to true
    if (loading) {
      return (
        <div className="Loading__Container">
          <Loading />
        </div>
      );
    }

    // Render only error message, if error occured while fetching data
    if (error) {
      return <div className="Error">{error}</div>;
    }
    return <Table currencies={currencies} renderChangePercent={this.renderChangePercent} />;
  }
}

export default List;
