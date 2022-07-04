import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

const [stocks, setStocks] = useState([]);
const [myStocks, setMyStocks] = useState([]);

function handleClick(stock){
  if(!myStocks.includes(stock)){
    const updatedStocks = [...myStocks, stock]
    setMyStocks(updatedStocks)
  }
}

useEffect(() => {
  fetch(`http://localhost:3001/stocks`)
  .then(r => r.json())
  .then(data => setStocks(data))
}, [])

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick={handleClick}/>
        </div>
        <div className="col-4">
          <PortfolioContainer myStocks={myStocks}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
