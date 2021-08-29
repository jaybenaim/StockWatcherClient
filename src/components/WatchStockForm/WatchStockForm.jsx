import React, { useState } from 'react';
import { FormControl, FormGroup, FormHelperText, InputLabel, Grid, Input, Button, Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import local from 'api/local';
import { Alert } from '@material-ui/lab';

const WatchStockForm = ({
  user,
  symbol,
  min,
  max,
  setMin,
  setMax,
  stockData,
  setAlertOpen,
  setAlert,
  setLoading
}) => {
  const watchStock = async () => {
    try {
      setLoading(true)
      const data = {
        "user": user,
        "symbol": symbol,
        "price": stockData.currentPrice,
        "min": min,
        "max": max
      }

      const response = await local.post(`stock/watch/`, data)
      console.log(response)

      if (response.status === 200) {
        console.log(response.data)
        setAlertOpen(true);
        setAlert({
          severity: "success",
          message: "New Stock Watcher Created"
        })
      }

    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        className="text-center pt-2"
      >
        <h3>Get notified when the price is out of this range: {min || stockData.currentPrice} - {max || stockData.currentPrice}</h3>
      </Grid>

      <Grid
        item
        xs={12}
      >
        <FormGroup>
          <Grid
            container
            className="watch-stock--form"
          >
            <Grid item xs={3}/>

            <Grid
              item
              xs={3}
              className="center"
            >
              <FormControl>
                <InputLabel htmlFor="min">Min: </InputLabel>
                <Input
                  id="min"
                  aria-describedby="min-price"
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                />

                <FormHelperText id="min-price">Min Price</FormHelperText>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={3}
              className="center"
            >
              <FormControl>
                <InputLabel htmlFor="max">Max: </InputLabel>
                <Input
                  id="max"
                  aria-describedby="max-price"
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                />

                <FormHelperText id="max-price">Max Price</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={3}/>

            <Grid
              item
              xs={12}
              className="watch-stock--form--submit"
            >
              <FormControl>
                <Button variant="outlined" onClick={watchStock}>
                  Watch
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
    </Grid>
  );
}

WatchStockForm.propTypes = {
  user: PropTypes.string,
  symbol: PropTypes.string.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
  setMin: PropTypes.func.isRequired,
  setMax: PropTypes.func.isRequired,
  stockData: PropTypes.object.isRequired,
  setAlertOpen: PropTypes.object.isRequired,
  setAlert: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.firebase.profile.email
  }
};

export default connect(mapStateToProps, {})(WatchStockForm);
