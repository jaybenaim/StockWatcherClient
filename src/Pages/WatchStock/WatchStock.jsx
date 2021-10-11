import React, { useState } from 'react';
import { Container, Grid, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { connect } from 'react-redux';
import PropTypes from "prop-types"

import WatchStockForm from 'components/WatchStockForm/WatchStockForm';
import WatchStockData from 'components/WatchStockData/WatchStockData';
import "./WatchStock.scss";
import StockWatcherList from 'components/StockList/StockWatcherList/StockWatcherList';

const WatchStock = (props) => {
  const symbol = props.match?.params?.symbol || ''
  const fullName = props.location?.state?.result?.replace(`${symbol} -`, '')
  const [stockData, setStockData] = useState({
    currency: '',
    regularMarketDayHigh: '',
    regularMarketDayLow: '',
    open: '',
    bid: '',
    bidSize: '',
    currentPrice: ''
  })
  const [isLoading, setLoading] = useState(false)
  const [watchStockForm, showWatchStockForm] = useState(false)
  const [min, setMin] = useState()
  const [max, setMax] = useState()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alert, setAlert] = useState({
    severity: "error",
    message: ""
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <Container className="p-3">
      {/* Title */}
      <Grid
        item
        container
        justifyContent="center"
        direction="column"
        xs={12}
      >
        <h1>
          {symbol}
        </h1>
        <h2>
          {fullName}
        </h2>
      </Grid>

      {/* Loader */}
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        xs={12}
      >
        {isLoading && <CircularProgress />}
      </Grid>

      {/* Alert */}
      <Grid
        item
        xs={12}
        className="text-center pt-2"
      >
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity={alert.severity} onClose={handleClose}>{alert.message}</Alert>
        </Snackbar>
      </Grid>

      {/* Stock Data */}
      <WatchStockData
        symbol={symbol}
        stockData={stockData}
        setStockData={setStockData}
        watchStockForm={watchStockForm}
        showWatchStockForm={showWatchStockForm}
        setAlert={setAlert}
        isLoading={isLoading}
        setLoading={setLoading}
      />

      {/* Watch Stock Form */}
      {watchStockForm && (
        <WatchStockForm
          symbol={symbol}
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
          stockData={stockData}
          setAlertOpen={setAlertOpen}
          setAlert={setAlert}
          setLoading={setLoading}
        />
      )}

      {/* Current Stock Watchers */}
      <StockWatcherList
        symbol={symbol}
        setLoading={setLoading}
        setAlertOpen={setAlertOpen}
        setAlert={setAlert}
      />
    </Container>
   );
}

WatchStock.propTypes = {
  user: PropTypes.string,
  match: PropTypes.object,
  location: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.firebase.profile.email
  }
};

export default connect(mapStateToProps, {})(WatchStock);
