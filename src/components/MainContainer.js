import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

const [stocks, setStocks] = useState([]);
const [myStocks, setMyStocks] = useState([]);

const [sortBy, setSortBy] = useState('')

useEffect(() => {
  fetch(`http://localhost:3001/stocks`)
  .then(r => r.json())
  .then(data => setStocks(data))
}, [])

function sortStocks(e) {
  setSortBy(e.target.value)
}

useEffect(() => {
  if(sortBy === 'Alphabetically'){
    const sortedStocks = sortByName()
    setStocks(sortedStocks)
  }else {
    const sortedStocks = sortByPrice()
    setStocks(sortedStocks)
  }
}, [ sortBy ])

const sortByName = () => {
  return [...stocks].sort(function(a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
}

const sortByPrice = () => {
  return [...stocks].sort(function (a, b) {
    return a.price - b.price;
  });
}

function buyStock(stock){
  if(!myStocks.includes(stock)){
    const updatedStocks = [...myStocks, stock]
    setMyStocks(updatedStocks)
  }
}

function sellStock(stock){
  const updatedMyStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
  setMyStocks(updatedMyStocks)
}

  return (
    <div>
      <SearchBar sortStocks={sortStocks} sortBy={sortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer myStocks={myStocks} handleClick={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
