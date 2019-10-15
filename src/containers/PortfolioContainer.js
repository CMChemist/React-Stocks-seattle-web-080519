import React, { Component } from 'react';

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            //render your portfolio stocks here
            this.props.displayStocks(this.props.purchasedStocks)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
