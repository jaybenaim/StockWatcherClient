import React from 'react';
import { Container, Grid } from '@material-ui/core';

const WatchStock = (props) => {
  const symbol = props.match.params.symbol || ''
  const fullName = props.location.state.result

  return (
    <Container class="p-3">
      <Grid container spacing={2}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <p>
            Symbol: {fullName}
          </p>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={6}
        >
          <p>
            \
                _/\
            __/    -
          </p>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={6}
        >
          <p>
            0000000
          </p>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={6}
        >
          <p>
            Min - [   ]
            Max - [   ]
          </p>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <p>
            Watch This Stock
          </p>
        </Grid>
      </Grid>
    </Container>
   );
}

export default WatchStock;