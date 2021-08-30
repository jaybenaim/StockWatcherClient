import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { Container, List, ListItem } from '@material-ui/core';
import local from 'api/local';

const StockWatcherList = ({ symbol, userEmail, setLoading }) => {
  const [stockWatchers, setStockWatchers] = useState([])

  const getStockWatchers = async () => {
    try {
      setLoading(true)
      let symbolParam = ''

      if (symbol && symbol.length > 0) {
        symbolParam = `&symbol=${symbol}`
      }

      const response = await local.get(`ticker_watchers?email=${userEmail}${symbolParam}`)
      console.log(response)

      if (response.status === 200) {
        console.log(response.data.results)
        setStockWatchers(response.data.results)
      }

    } catch(err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    getStockWatchers()

  // eslint-disable-next-line
  }, [userEmail])


  const listItems = () => {
    return stockWatchers.map((tickerWatcher, i) => {
        const {
          ticker,
          min_price,
          max_price,
          created_at,
          updated_at
        } = tickerWatcher

      const lastUpdated = new Date(updated_at)

      return (
        <ListItem
          key={i}
          className="stock-watcher--list-item display-col justify-start"
        >
          <p>{ticker.symbol} - ${" "}
            <span className={ticker.price < min_price || ticker.price > max_price ? 'price-out-of-range' : 'price-in-range'}>
              {ticker.price}
            </span>
          </p>

          {ticker.name && (
            <p>
              <strong>{ticker.name}</strong>
            </p>
          )}

          <p>
            <strong>Min: </strong><span>{min_price}</span>
          </p>

          <p>
            <strong>Max: </strong><span>{max_price}</span>
          </p>

          <p>
            <strong>Last Updated: </strong><span>{lastUpdated.toLocaleString()}</span>
          </p>
        </ListItem>
      )
    })
  }

  return (
    <Container>
      {symbol ? (
        <h3 className="center pt-3">Current Watchers for {symbol}</h3>
      ): (
        <h3 className="center pt-3">Current Stock Watchers</h3>
      )}

      <List className="stock-watcher--list">
        {stockWatchers && listItems()}
      </List>
    </Container>
   );
}

StockWatcherList.propTypes = {
  symbol: PropTypes.string,
  userEmail: PropTypes.string,
  setLoading: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    userEmail: state.firebase.profile.email
  }
};

export default connect(mapStateToProps, {})(StockWatcherList);
