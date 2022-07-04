import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ myStocks, handleClick }) {

  const stockList = myStocks.map(stock => {
    return <Stock 
            key={stock.id} 
            stock={stock}
            handleClick={handleClick}
            />
  })

  return (
    <div>
      <h2>My Portfolio</h2>
      {stockList}
    </div>
  );
}

export default PortfolioContainer;
