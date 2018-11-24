import React, { Component } from "react";

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
    fetch("https://api.udilia.com/coins/v1/cryptocurrencies?page=1&perPage=20")
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(data => {
        this.setState({ loading: false, currencies: data.currencies });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
      });
  }

  render() {
    
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return <div>List</div>;
  }
}

export default List;
