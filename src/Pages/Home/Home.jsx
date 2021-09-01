import StockWatcherList from "components/StockWatcherList/StockWatcherList";
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
      </div>
    </main>
  );
};
export default Home;
