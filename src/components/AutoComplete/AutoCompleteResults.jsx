import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

const AutocompleteResults = ({results}) => {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      <ul className={classes.ul}>
        {results.map((result, i) => (
          <ListItem key={i}>
            <ListItemText className="autocomplete--result" primary={result} />
          </ListItem>
        ))}
      </ul>
  </List>
);
}

export default AutocompleteResults;

