import React, { Component } from 'react';

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          //render the list of stocks here
          this.props.displayStocks(this.props.stocks)
        }
      </div>
    );
  }

}

export default StockContainer;
