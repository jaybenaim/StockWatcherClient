import React, { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress, Button } from '@material-ui/core';
import local from 'api/local';
import "./WatchStock.scss";
import { useReducer } from 'react';

const WatchStock = (props) => {
  const symbol = props.match?.params?.symbol || ''
  const fullName = props.location?.state?.result?.replace(`${symbol} -`, '')
  const [price, setPrice] = useState(0)
  const [stockData, setStockData] = useState({
    currency: '',
    regularMarketDayHigh: '',
    regularMarketDayLow: '',
    open: '',
    bid: '',
    bidSize: ''
  })
  const [isLoading, setLoading] = useState(false)

  const getStockData = async (e, stockSymbol = '') => {
    let query;

    if (e && 'target' in e.keys()) {
      query = e.target.value
    } else {
      if (stockSymbol.length > 0) {
        query = stockSymbol
      }
    }

    if (query.length > 0) {
      try {
        setLoading(true)
        const response = await local.get(`/search/summary?symbol=${symbol}`)
        console.log(response)

        if (response.status == 200) {
          const price = response.data.current_price || []
          console.log(response.data[symbol])
          setStockData(response.data)
        }
      } catch(err) {
        console.log(err)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    symbol.length > 1 && getStockData(null, symbol)
  }, [symbol])

  return (
    <Container className="p-3">
      <Grid container spacing={2}>
        <Grid
          item
          container
          justifyContent="center"
          direction="column"
          xs={12}
        >
          <h1>
            {symbol}
          </h1>
          <h2>
            {fullName}
          </h2>
        </Grid>

        <Grid
          item
          container
          direction="column"
          xs={6}
        >
          <p>
            \
                _/\
            __/    -
          </p>
          CHART
        </Grid>

        <Grid
          item
          container
          xs={6}
          direction="column"
          className="stock-data--right-column"
        >
          {!isLoading && stockData && Object.keys(stockData).length > 0 && (
            <Grid
              container
            >
              <Grid
                item
                xs={6}>
                <p>
                  Current Price ${stockData.currentPrice} {stockData.currency}
                </p>
              </Grid>

              <Grid
                item
                xs={6}>
                <p>
                  Open - {stockData.open}
                </p>
              </Grid>

              <Grid
                item
                xs={6}>
                <p>
                  Day High - {stockData.regularMarketDayHigh}
                </p>
              </Grid>

              <Grid
                item
                xs={6}>
                <p>
                  Day Low - {stockData.regularMarketDayLow}
                </p>
              </Grid>

              <Grid
                item
                xs={6}>
                <p>
                  Last Bid - {stockData.bid}
                </p>
              </Grid>

              <Grid
                item
                xs={6}>
                <p>
                  Bid Size - {stockData.bidSize}
                </p>
              </Grid>
            </Grid>
          )}
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
          container
          direction="column"
          xs={6}
        >
          chart
        </Grid>

        <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            <Button onClick={getStockData} variant="outlined">
              Watch This Stock
            </Button>
          </Grid>
      </Grid>
    </Container>
   );
}

export default WatchStock;