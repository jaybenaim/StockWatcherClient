import React, { useEffect } from 'react';
import PropTypes from "prop-types"
import local from 'api/local';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';

const WatchStockData = ({
  symbol,
  stockData,
  setStockData,
  watchStockForm,
  showWatchStockForm,
  setAlert,
  isLoading,
  setLoading
}) => {
  const getStockData = async (e, stockSymbol = '') => {
    let query;

    if (e && 'target' in e.keys()) {
      query = e.target.value
    } else {
      if (stockSymbol.length > 0) {
        query = stockSymbol
      }
    }

    if (query.length > 0) {
      try {
        setLoading(true)
        const response = await local.get(`/stock/summary?symbol=${symbol}`)

        if (response.status === 200) {
          setStockData(response.data)
          setLoading(false)

        }
      } catch(err) {
        console.log(err)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    symbol.length > 1 && getStockData(null, symbol)
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container spacing={2}>
      {/* Chart */}
      <Grid
        item
        container
        direction="column"
        xs={6}
      >
        <p>
          \
              _/\
          __/    -
        </p>
        CHART
      </Grid>
      {/* Data */}
      <Grid
        item
        container
        xs={6}
        direction="column"
        className="stock-data--right-column"
      >
        {!isLoading && stockData && Object.keys(stockData).length > 0 && (
          <Grid
            container
          >
            <Grid
              item
              xs={6}>
              <p>
                Current Price ${stockData.currentPrice} {stockData.currency}
              </p>
            </Grid>

            <Grid
              item
              xs={6}>
              <p>
                Open - {stockData.open}
              </p>
            </Grid>

            <Grid
              item
              xs={6}>
              <p>
                Day High - {stockData.regularMarketDayHigh}
              </p>
            </Grid>

            <Grid
              item
              xs={6}>
              <p>
                Day Low - {stockData.regularMarketDayLow}
              </p>
            </Grid>

            <Grid
              item
              xs={6}>
              <p>
                Last Bid - {stockData.bid}
              </p>
            </Grid>

            <Grid
              item
              xs={6}>
              <p>
                Bid Size - {stockData.bidSize}
              </p>
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* Chart 2 */}
      <Grid
        item
        container
        direction="column"
        xs={6}
      >
        chart
      </Grid>
      {/* Watch Stock */}
      <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          {!watchStockForm && (
            <Button onClick={() => showWatchStockForm(!watchStockForm)} variant="outlined">
              Watch This Stock
            </Button>
          )}
        </Grid>
    </Grid>
   );
}

WatchStockData.propTypes = {
  user: PropTypes.string,
  symbol: PropTypes.string,
  stockData: PropTypes.object,
  setStockData: PropTypes.func.isRequired,
  watchStockForm: PropTypes.bool.isRequired,
  showWatchStockForm: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.firebase.profile.email
  }
};

export default connect(mapStateToProps, {})(WatchStockData);
