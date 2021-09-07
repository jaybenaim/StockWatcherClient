import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { Container, List } from '@material-ui/core';
import moment from "moment"
import StockWatcherListItem from '../StockWatcherListItem/StockWatcherListItem';
import { getStockWatchersByEmail } from 'redux-store/actions/watcherActions';

const StockWatcherList = (props) => {
  let { symbol, userEmail, setLoading, watchers } = props

  const getStockWatchers = async () => {
    try {
      setLoading(true)
      // const response = dispatch({ type: GET_STOCK_WATCHERS_BY_EMAIL, payload: { email: userEmail, symbol: symbol }})
      const response = await props.getStockWatchersByEmail({ email: userEmail, symbol })
      console.log(response)
      // setStockWatchers(response.results)
    } catch(err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (userEmail && userEmail.length > 0) {
      getStockWatchers()
    }

  // eslint-disable-next-line
  }, [userEmail])


  const listItems = () => {
    return watchers.map((tickerWatcher, i) => {
      const {
        ticker,
        min_price,
        max_price,
        created_at,
        // updated_at
      } = tickerWatcher

      const dateFormat = 'lll'
      const created = moment(created_at).format(dateFormat).replace(', 2021', ' - ')
      const lastUpdated = moment(ticker.updated_at).format(dateFormat).replace(', 2021', ' - ')

      return (
        <StockWatcherListItem
          key={i}
          ticker={ticker}
          min_price={min_price}
          max_price={max_price}
          created={created}
          lastUpdated={lastUpdated}
        />
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
        {watchers && listItems()}
      </List>
    </Container>
   );
}

StockWatcherList.propTypes = {
  symbol: PropTypes.string,
  userEmail: PropTypes.string,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  getStockWatchersByEmail: PropTypes.func,
  watchers: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    userEmail: state.firebase.profile.email,
    watchers: state.watchers.watchersForUser,
  }
};

export default connect(mapStateToProps, { getStockWatchersByEmail })(StockWatcherList);
