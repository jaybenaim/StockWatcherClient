import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { getRecentTickers } from "redux-store/actions/tickerActions"
import { Paper, Slide } from '@material-ui/core';
import Ticker from 'react-ticker';
import moment from 'moment';

const TickerSlider = (props) => {
  const { recentTickers } = props

  useEffect(() => {
    props.getRecentTickers()
    // eslint-disable-next-line
  }, [])

  const slides = () => recentTickers.map((ticker, i) => (
    <Paper elevation={2} className="ticker-slider__item" key={i}>
      <p>Ticker: {ticker.symbol}</p>
      <p>Price: <span className="price">{ticker.price}</span></p>
      <p>{moment(ticker.updated_at).format('MMM Do, h:mm a')}</p>
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
