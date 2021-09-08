import StockWatcherList from "components/StockList/StockWatcherList/StockWatcherList";
import TickerSlider from "components/TickerSlider/TickerSlider";
import React, {useState} from "react";

const Home = () => {
  const [loading, setLoading] = useState(false)

  return (
    <main id="mainContent">
      <div className="container">
        <StockWatcherList
          loading={loading}
          setLoading={setLoading}
        />

        <TickerSlider/>
      </div>
    </main>
  );
};
export default Home;
