import React, { Component } from "react";

import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import Loading from "../Loading/Loading";
import Table from "./Table";
import Pagination from "./Pagination";
class List extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = () => {
    this.setState({ loading: true });
    const { page } = this.state;

    fetch(API_URL + `/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then(data => {
        const { currencies, totalPages } = data;
        this.setState({
          loading: false,
          currencies,
          totalPages
        });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
      });
  };

  renderChangePercent = percent => {
    if (percent > 0)
      return <span className="Percent__Raised">{percent}% &uarr;</span>;
    else if (percent < 0)
      return <span className="Percent__Fallen">{percent}% &darr;</span>;
    else return <span>{percent}</span>;
  };

  handlePaginationClick = direction => {
    let nextPage = this.state.page;

    // Increment nextPage if direction variable is next, otherwise decrement
    nextPage = direction === "next" ? (nextPage += 1) : (nextPage -= 1);
    this.setState({ page: nextPage }, () => this.fetchCurrencies());
  };

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;

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
    return (
      <div>
        <Table
          currencies={currencies}
          renderChangePercent={this.renderChangePercent}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
