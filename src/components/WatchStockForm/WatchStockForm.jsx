import React, { useEffect } from 'react';
import { FormControl, FormGroup, FormHelperText, InputLabel, Grid, Input, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from "prop-types"
import local from 'api/local';

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
        "min_price": min,
        "max_price": max
      }

      const response = await local.post(`stock/watch/`, data)

      if (response.data.status !== 500) {
        setAlertOpen(true);
        setAlert({
          severity: "success",
          message: "New Stock Watcher Created"
        })
      } else {
        setAlertOpen(true);
        setAlert({
          severity: "error",
          message: "Issue creating new stock watcher, please try again."
        })
      }
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const listener = event => {
    console.log(event)
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      watchStock()
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", listener);
    return () => {
      document.removeEventListener("keypress", listener);
    };
    // eslint-disable-next-line
  }, [min, max]);

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
        <form>
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
        </form>
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
  setAlertOpen: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.firebase.profile.email
  }
};

export default connect(mapStateToProps, {})(WatchStockForm);
