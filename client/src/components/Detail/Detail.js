import React, { Component } from "react";

import { API_URL } from "../../config";
import { handleResponse, renderChangePercent } from "../../helpers";
import Loading from "../Loading/Loading";

import "./Detail.css";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {},
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    const currencyId = this.props.match.params.id;

    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then(currency => {
        this.setState({ loading: false, error: null, currency });
      })
      .catch(err => {
        this.setState({ loading: false, error: err.errorMessage });
      });
  }

  render() {
    const { loading, error, currency } = this.state;
    if (loading) {
      return (
        <div className="Loading__Container">
          <Loading />
        </div>
      );
    }

    if (error) {
      return <div className="error">{error}</div>;
    }
    return (
      <div className="Detail">
        <h1 className="Detail__Heading">
          {" "}
          {currency.name} ({currency.symbol})
        </h1>
        <div className="Detail__Container">
          <div className="Detail__Item">
            Price <span className="Detail__Value">$ {currency.price}</span>
          </div>
          <div className="Detail__Item">
            Rank <span className="Detail__Value">{currency.rank}</span>
          </div>
          <div className="Detail__Item">
            24H Change{" "}
            <span className="Detail__Value">
              {renderChangePercent(currency.percentChange24h)}
            </span>
          </div>
          <div className="Detail__Item">
            <span className="Detail__Title">Market Cap</span>
            <span className="Detail__Dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail__Item">
            <span className="Detail__Title">24H volume</span>
            <span className="Detail__Dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail__Item">
            <span className="Detail__Title">Total supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
