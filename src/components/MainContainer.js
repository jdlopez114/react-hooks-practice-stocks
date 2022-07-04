import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

const [stocks, setStocks] = useState([]);
const [myStocks, setMyStocks] = useState([]);
const [sortBy, setSortBy] = useState('')
const [filterBy, setFilterBy] = useState("Tech");

useEffect(() => {
  fetch(`http://localhost:3001/stocks`)
  .then(r => r.json())
  .then(data => setStocks(data))
}, [])

const sortedStocks = [...stocks].sort((stock1, stock2) => {
  if (sortBy === "Alphabetically") {
    return stock1.name.localeCompare(stock2.name);
  } else {
    return stock1.price - stock2.price;
  }
});

const filteredStocks = sortedStocks.filter(
  (stock) => stock.type === filterBy
);

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
      <SearchBar 
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
    />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer myStocks={myStocks} handleClick={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
