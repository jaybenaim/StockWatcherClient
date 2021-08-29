import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';
import AutoCompleteResult from './AutoCompleteResult';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const AutocompleteResults = ({ results, setResults }) => {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      <ul className={classes.ul}>
        {results.map((result, i) => (
          <Link
            to={{
              pathname: `search/${result.split('-')[0]}`,
              state: { result }
            }}
            key={i}
          >
          <ListItem>
            <AutoCompleteResult result={result} setResults={setResults} />
          </ListItem>
        </Link>
        ))}
      </ul>
  </List>
);
}

export default AutocompleteResults;

