import React from 'react';
import { ListItemText } from '@material-ui/core';

const AutoCompleteResult = ({ result, setResults }) => {

  const handleClick = () => {
    setResults([])
  }

  return (
    <ListItemText
      className="autocomplete--result"
      primary={result}
      onClick={handleClick}
    />
   );
}

export default AutoCompleteResult;