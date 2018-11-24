import React, { Component } from "react";

import "./Table.css";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
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
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="Table__Container">
        <table className="Table">
          <thead className="Table__Head">
            <tr>
              <th>Cryptocurrency</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24H Change</th>
            </tr>
          </thead>
          <tbody className="Table__Body">
            {this.state.currencies.map(currency => (
              <tr key={currency.id}>
                <td>
                  <span className="Table__Rank">{currency.rank}</span>
                  {currency.name}
                </td>
                <td>
                  <span className="Table__Dollar">$ {currency.price}</span>
                </td>
                <td>
                  <span className="Table__Dollar">$ {currency.marketCap}</span>
                </td>
                <td>
                  {this.renderChangePercent(currency.percentChange24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
