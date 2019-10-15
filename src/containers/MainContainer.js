import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
import Stock from '../components/Stock'
// import { callbackify } from 'util';

const API = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  constructor() {
    super();
    this.state = {
      'stocks': [],
      'purchasedStocks': []
    }
    this.getAllStocks(null)
  }

  getAllStocks(callBack) {
    fetch(API) 
    .then(response => response.json())
    .then(data => this.setState({stocks: data}, callBack));
  }

  handleClickStock = (event, stock) => {
    console.log(event.target)
    console.log(event.target.parentElement.parentElement.parentElement.parentElement.querySelector('h2').innerText)
    const container = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('h2').innerText;
    const purchasedStocksArray = this.state.purchasedStocks;
    const purchasedStockIndex = this.state.purchasedStocks.findIndex(element => element.id === stock.id);
    if (container === 'Stocks') {
      purchasedStocksArray.push(stock);
    } else {
      purchasedStocksArray.splice(purchasedStockIndex, 1);
    }

    this.setState({purchasedStocks: purchasedStocksArray});
  }

  displayStocks(stocks) {
      // let stockCompontents = [];
      // for(let i = 0; i < stocks.length; i++) {
      //   stockCompontents[i] = <Stock stock={stocks[i]} handleClickStock={this.handleClickStock}/>
      // }
      // return stockCompontents;
      // let stockCompontents = [];
      return stocks.map((element) => <Stock key={Math.random()} stock={element} handleClickStock={this.handleClickStock}/>)
  }

  handleSort = (event) => {
    // event.preventDefault();
    const sortType = event.target.value;
    let sortedStocks = [];
    if (sortType === 'Alphabetically') {
      sortedStocks = this.state.stocks.sort((a, b) => {
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    } else if (sortType === 'Price'){
      sortedStocks = this.state.stocks.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      this.getAllStocks(null);
    }
    this.setState({stocks: sortedStocks})
  }

  handleFilter = (event) => {
    const filterType = event.target.value;
    this.getAllStocks(() => this.finishHandleFilter(filterType));
  }

  finishHandleFilter = (filterType) => {
    let filteredStocks = this.state.stocks;
    if (filterType !== "All") {
      filteredStocks = this.state.stocks.filter( element => {
        return element.type === filterType;
      })
    }
    this.setState({stocks: filteredStocks});
  }

  render() {
    return (
      <div>
        <SearchBar handleSort={this.handleSort} handleFilter={this.handleFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} handleClickStock={this.handleClickStock} displayStocks={this.displayStocks}/>
            
            </div>
            <div className="col-4">

              <PortfolioContainer purchasedStocks={this.state.purchasedStocks} handleClickStock={this.handleClickStock} displayStocks={this.displayStocks}/>

            </div>
          </div>
      </div>
    );
  }
}

export default MainContainer;
