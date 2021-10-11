import React, { useEffect, useState } from 'react';
import { FormControl, FormGroup, FormHelperText, InputLabel, Grid, Input, Button, CircularProgress } from '@material-ui/core';
import PropTypes from "prop-types"
import local from 'api/local';
import { connect } from 'react-redux';

const StockWatcherEditForm = ({
    tickerWatcher,
    min: prevMin,
    max: prevMax,
    setAlertOpen,
    setAlert,
    onSuccess: getStockWatchers,
  }) => {
  const [isLoading, setLoading] = useState(false)
  const [min, setMin] = useState(prevMin)
  const [max, setMax] = useState(prevMax)

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


  const listener = event => {

    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();

      if (prevMin !== min || prevMax !== max) return editStockWatcher()
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
        <form>
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
                  <Button
                    variant="outlined"
                    onClick={editStockWatcher}
                  >
                    Update
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

StockWatcherEditForm.propTypes = {
  user: PropTypes.string,
  tickerWatcher: PropTypes.object.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setAlertOpen: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
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
