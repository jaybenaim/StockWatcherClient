import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { Button, Container, List, Snackbar } from '@material-ui/core';
import moment from "moment"
import StockWatcherListItem from '../StockWatcherListItem/StockWatcherListItem';
import { getStockWatchersByEmail } from 'redux-store/actions/watcherActions';
import StockWatcherEditForm from '../StockWatcherEditForm/StockWatcherEditForm';
import { ArrowDownward } from '@material-ui/icons';
import local from 'api/local';
import { Alert } from '@material-ui/lab';

const StockWatcherList = (props) => {
  let { symbol, userEmail, setLoading, watchers } = props
  const [alertOpen, setAlertOpen] = useState(false)
  const [alert, setAlert] = useState({
    severity: "info",
    message: ""
  })
  const [ tickerToEdit, setTickerToEdit ] = useState(undefined)
  const [ showEditButton, toggleEditButton ] = useState({
    ticker: undefined,
    open: false
  })

  const getStockWatchers = async () => {
    try {
      setLoading(true)
      // const response = dispatch({ type: GET_STOCK_WATCHERS_BY_EMAIL, payload: { email: userEmail, symbol: symbol }})
      const response = await props.getStockWatchersByEmail({ email: userEmail, symbol })
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

  const handleEdit = (tickerSymbol) => {
    if (tickerSymbol === tickerToEdit) {
      setTickerToEdit(undefined)
    } else {
      setTickerToEdit(tickerSymbol)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await local.delete(`/watchers/${id}`)

      if (response.status !== 500) {
        setAlertOpen(true);
        setAlert({
          severity: "success",
          message: `Deleted Stock Watcher for ${showEditButton.ticker}`
        })
        getStockWatchers()
      } else {
        setAlertOpen(true);
        setAlert({
          severity: "error",
          message: "Issue deleting current stock watcher, please try again."
        })
      }
    } catch (err) {
      setAlertOpen(true);
      setAlert({
        severity: "error",
        message: err.message
      })
    }
  }

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
      const created = moment(created_at).format(dateFormat).replace(', 2021', ', ')
      const lastUpdated = moment(ticker.updated_at).format(dateFormat).replace(', 2021', ', ')

      return (
        <div
          key={i}
          className="stock-watcher-list__item"
          onMouseLeave={() => toggleEditButton({
            ticker: ticker.symbol,
            open: false
          })}
        >
          {((tickerToEdit === undefined) || (tickerToEdit === ticker.symbol)) && (
            <div className="stock-watcher-list__item-wrapper">
              <StockWatcherListItem
                ticker={ticker}
                min={min_price}
                max={max_price}
                created={created}
                lastUpdated={lastUpdated}
              />

              {(showEditButton.ticker === ticker.symbol) && showEditButton.open ? (
                <div className="stock-watcher-list__dropdown-buttons">
                  <Button
                    onClick={() => handleEdit(ticker.symbol)}
                    variant="outlined"
                  >
                    {tickerToEdit === ticker.symbol ? "Hide" : "Edit"}
                  </Button>

                  <Button
                    onClick={() => handleDelete(tickerWatcher.id)}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div
                  className="stock-watcher-list__edit-toggle-icon"
                  onMouseEnter={() => toggleEditButton({
                    ticker: ticker.symbol,
                    open: true
                  })}
                >
                  <ArrowDownward />
                </div>
              )}
            </div>
          )}


          {tickerToEdit === ticker.symbol && (

            <StockWatcherEditForm
              tickerWatcher={tickerWatcher}
              min={min_price}
              max={max_price}
              onSuccess={getStockWatchers}
            />
          )}
        </div>
      )
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

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

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={alert.severity} onClose={handleClose}>{alert.message}</Alert>
      </Snackbar>
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
