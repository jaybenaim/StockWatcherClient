import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import { Container, List, Button } from '@material-ui/core';
import moment from "moment"
import StockWatcherListItem from '../StockWatcherListItem/StockWatcherListItem';
import { getStockWatchersByEmail } from 'redux-store/actions/watcherActions';
import StockWatcherEditForm from '../StockWatcherEditForm/StockWatcherEditForm';
import { ArrowDownward } from '@material-ui/icons';
import local from 'api/local';

const StockWatcherList = (props) => {
  let {
    symbol,
    userEmail,
    setLoading,
    watchers,
    setAlert,
    setAlertOpen
  } = props
  const [ deleteClass, toggleDeleteClass ] = useState('delete-btn')
  const [ tickerToEdit, setTickerToEdit ] = useState(undefined)
  const [ showDropdownButtons, toggleEditButton ] = useState({
    watcher: undefined,
    open: false
  })


  const getStockWatchers = async () => {
    try {
      setLoading(true)
      // const response = dispatch({ type: GET_STOCK_WATCHERS_BY_EMAIL, payload: { email: userEmail, symbol: symbol }})
      await props.getStockWatchersByEmail({ email: userEmail, symbol })
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
          message: `Deleted Stock Watcher for ${showDropdownButtons.watcher}`
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
    setTickerToEdit(undefined)
  }

  const listItems = () => {
    return watchers.map((tickerWatcher, i) => {
      const {
        id,
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
            watcher: id,
            open: false
          })}
        >
          {((tickerToEdit === undefined) || (tickerToEdit === id)) && (
            <div className="stock-watcher-list__item-wrapper">
              <StockWatcherListItem
                ticker={ticker}
                min={min_price}
                max={max_price}
                created={created}
                lastUpdated={lastUpdated}
              />

              {(showDropdownButtons.watcher === id) && showDropdownButtons.open ? (
                <div className="stock-watcher-list__dropdown-buttons">
                  <Button
                    onClick={() => handleEdit(id)}
                    variant="outlined"
                  >
                    {tickerToEdit === id ? "Hide" : "Edit"}
                  </Button>

                  <Button
                    onClick={() => handleDelete(tickerWatcher.id)}
                    variant="contained"
                    color={deleteClass ? "error" : "secondary"}
                    onMouseEnter={() => toggleDeleteClass(!deleteClass)}
                    onMouseLeave={() => toggleDeleteClass(!deleteClass)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div
                  className="stock-watcher-list__edit-toggle-icon"
                  onMouseEnter={() => toggleEditButton({
                    watcher: id,
                    open: true
                  })}
                >
                  <ArrowDownward />
                </div>
              )}
            </div>
          )}


          {tickerToEdit === id && (

            <StockWatcherEditForm
              tickerWatcher={tickerWatcher}
              min={min_price}
              max={max_price}
              onSuccess={getStockWatchers}
              setAlert={setAlert}
              setAlertOpen={setAlertOpen}
            />
          )}
        </div>
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
  watchers: PropTypes.array,
  setAlert: PropTypes.func.isRequired,
  setAlertOpen: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    userEmail: state.firebase.profile.email,
    watchers: state.watchers.watchersForUser,
  }
};

export default connect(mapStateToProps, { getStockWatchersByEmail })(StockWatcherList);
