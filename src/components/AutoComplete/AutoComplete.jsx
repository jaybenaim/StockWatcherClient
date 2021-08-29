import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import local from "api/local"
import AutocompleteResults from './AutoCompleteResults';
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from "@material-ui/core"
import "./Autocomplete.scss"

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AutoComplete = () => {
  const classes = useStyles();

  const [results, setResults] = useState([])


  const autocompleteSearch = async (e) => {
    const query = e.target.value

    if (query.length >= 2) {
      try {
        const response = await local.get(`/search?query=${query}`)
        console.log(response)

        if (response.status == 200) {
          const results = response.data.results || []
          setResults(results)
        }
      } catch(err) {
        console.log(err)
      }
    } else if (query.length <= 1) {
      setResults([])
    }
  }

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>

        <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={autocompleteSearch}
          />
      </div>

      <div className="autocomplete--results">
        <AutocompleteResults results={results} setResults={setResults}/>
      </div>
    </>
  );
}

export default AutoComplete;