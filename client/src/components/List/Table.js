import React from "react";
import PropTypes from "prop-types";

import "./Table.css";

const Table = props => {
  const { currencies, renderChangePercent } = props;
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
          {currencies.map(currency => (
            <tr key={currency.id}>
              <td>
                <span className="Table__Rank">{currency.rank}</span>
                {currency.name}
              </td>
              <td>
                <span className="Table__Dollar">$ </span>
                {currency.price}
              </td>
              <td>
                <span className="Table__Dollar">$ </span>
                {currency.marketCap}
              </td>
              <td>{renderChangePercent(currency.percentChange24h)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  currencies: PropTypes.array.isRequired,
  renderChangePercent: PropTypes.func.isRequired
};

export default Table;
