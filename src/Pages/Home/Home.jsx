import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import StockWatcherList from "components/StockList/StockWatcherList/StockWatcherList";
import TickerSlider from "components/TickerSlider/TickerSlider";
import React, {useState} from "react";

const Home = () => {
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
export default Home;
