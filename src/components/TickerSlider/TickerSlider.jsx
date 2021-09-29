import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux"
import { getRecentTickers } from "redux-store/actions/tickerActions"
import { Paper } from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import StockWatcherListItem from 'components/StockList/StockWatcherListItem/StockWatcherListItem';

const TickerSlider = (props) => {
  const { recentTickers } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecentTickers())
    // eslint-disable-next-line
  }, [])

  const slides = () => recentTickers.map((ticker, i) => (
    <Paper elevation={2} className="ticker-slider__item" key={i}>
      <Link to={{
        pathname: "/search/" + ticker.symbol,
        state: { ticker }
      }}>
        <p>Tkr: <span className="ticker-slider__item--ticker">{ticker.symbol}</span></p>
        <p>Price: <span className="ticker-slider__item--price">{ticker.price}</span></p>
        <p>{moment(ticker.updated_at).format('MMM Do, h:mm a')}</p>
      </Link>
    </Paper>
  ))

  return (
    <>
    {/* <Ticker offset="run-in">
      {({ index }) => slides()}
    </Ticker> */}
    <section>
      <div className="container ticker-slider scroll">
        {slides()}
      </div>
    </section>
    </>
   );
}

TickerSlider.propTypes = {
  errors: PropTypes.object,
  getRecentTickers: PropTypes.func,
  recentTickers: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    recentTickers: state.tickers.recentTickers
  }
};

export default connect(mapStateToProps, { getRecentTickers })(TickerSlider);
