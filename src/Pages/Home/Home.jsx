import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import StockWatcherList from "components/StockList/StockWatcherList/StockWatcherList";
import TickerSlider from "components/TickerSlider/TickerSlider";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types"

const Home = ({ auth }) => {
  const [forceRefresh, setForceRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    setForceRefresh(!forceRefresh)
  // eslint-disable-next-line
  }, [auth])

  return (
    <main id="mainContent">
      <div className="container">
        <TickerSlider/>

        <StockWatcherList
          loading={loading}
          setLoading={setLoading}
          setAlertOpen={setAlertOpen}
          setAlert={setAlert}
        />

        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity={alert.severity} onClose={handleClose}>{alert.message}</Alert>
        </Snackbar>
      </div>
    </main>
  );
};

Home.propTypes = {
  auth: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}
export default connect(mapStateToProps, {})(Home);
