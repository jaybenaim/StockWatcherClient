import React, { useState } from 'react';
import TICKS from "data/StockData/stock_symbols"
const AutoComplete = () => {

  const [results, setResults] = useState([])

  const resultsNames = TICKS.map((tick) => tick.name)

  return (
    {resultsNames}
    );
}

export default AutoComplete;