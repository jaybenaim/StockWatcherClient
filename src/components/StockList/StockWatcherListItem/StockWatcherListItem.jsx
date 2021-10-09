import React from 'react';
import PropTypes from "prop-types";
import { ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

const StockWatcherListItem = ({
  ticker,
  min,
  max,
  created,
  lastUpdated
}) => {
  return (
    <ListItem
      className="stock-watcher--list-item display-col justify-start"
    >
      <p>
        <Link to={`search/${ticker.symbol}`} className="stock-watcher--list-item-link">
          {ticker.symbol} - ${" "}

          <span className={
            (Number(ticker.price) < Number(min)) || (Number(ticker.price) > Number(max))
            ? 'price-out-of-range'
            : 'price-in-range'}
          >
            {ticker.price}
          </span>
        </Link>
      </p>

      {ticker.name && (
        <p>
          <strong>{ticker.name}</strong>
        </p>
      )}

      <p>
        <strong>Min: </strong><span>{min}</span>
      </p>

      <p>
        <strong>Max: </strong><span>{max}</span>
      </p>

      <p>
        <strong>Created At: </strong><span>{created}</span>
      </p>

      <p>
        <strong>Price Last Updated: </strong><span>{lastUpdated}</span>
      </p>
    </ListItem>
   );
}

StockWatcherListItem.propTypes = {
  ticker: PropTypes.object,
  min: PropTypes.string,
  max: PropTypes.string,
  created: PropTypes.string,
  lastUpdated: PropTypes.string
}

const mapStateToProps = (state) => {
  return state
};

export default connect(mapStateToProps, {})(StockWatcherListItem);
