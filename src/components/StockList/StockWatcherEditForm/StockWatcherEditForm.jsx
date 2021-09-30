import React, { useState } from 'react';
import { FormControl, FormGroup, FormHelperText, InputLabel, Grid, Input, Button, Snackbar, CircularProgress } from '@material-ui/core';
import PropTypes from "prop-types"
import local from 'api/local';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';

const StockWatcherEditForm = ({ tickerWatcher, min: prevMin, max: prevMax, onSuccess: getStockWatchers }) => {
  const [isLoading, setLoading] = useState(false)
  const [min, setMin] = useState(prevMin)
  const [max, setMax] = useState(prevMax)

  const [alertOpen, setAlertOpen] = useState(false)
  const [alert, setAlert] = useState({
    severity: "info",
    message: ""
  })

  const editStockWatcher = async () => {
    try {
      setLoading(true)
      const data = {
        "min_price": min,
        "max_price": max
      }

      const response = await local.put(`/watchers/${tickerWatcher.id}/`, data)

      if (response.data.status !== 500) {
        getStockWatchers()
        setAlertOpen(true);
        setAlert({
          severity: "success",
          message: "Updated Stock Watcher"
        })
      } else {
        setAlertOpen(true);
        setAlert({
          severity: "error",
          message: "Issue updating current stock watcher, please try again."
        })
      }
    } catch(err) {
      setAlertOpen(true);
      setAlert({
        severity: "error",
        message: "Issue updating current stock watcher, please try again."
      })
    }
    setLoading(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <div>
      <Grid
        item
        xs={12}
        className="text-center pt-2"
      >
        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity={alert.severity} onClose={handleClose}>{alert.message}</Alert>
        </Snackbar>
      </Grid>

      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        xs={12}
      >
        {isLoading && <CircularProgress />}
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

            <Grid
              item
              xs={5}
              className="center"
            >
              <FormControl>
                <InputLabel htmlFor="min">Min: </InputLabel>
                <Input
                  id="min"
                  aria-describedby="min-price"
                  defaultValue={prevMin}
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                />

                <FormHelperText id="min-price">Min Price</FormHelperText>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={2}
            />

            <Grid
              item
              xs={5}
              className="center"
            >
              <FormControl>
                <InputLabel htmlFor="max">Max: </InputLabel>
                <Input
                  id="max"
                  aria-describedby="max-price"
                  defaultValue={prevMax}
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                />

                <FormHelperText id="max-price">Max Price</FormHelperText>
              </FormControl>
            </Grid>


            <Grid
              item
              xs={12}
              className="watch-stock--form--submit"
            >
              <FormControl>
                <Button variant="outlined" onClick={editStockWatcher}>
                  Watch
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </FormGroup>
      </Grid>
    </div>
   );
}

StockWatcherEditForm.propTypes = {
  user: PropTypes.string,
  tickerWatcher: PropTypes.object.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setMin: PropTypes.func,
  setMax: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    user: state.firebase.profile.email
  }
};

export default connect(mapStateToProps, {})(StockWatcherEditForm);
