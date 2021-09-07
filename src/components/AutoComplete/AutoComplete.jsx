import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AutocompleteResults from './AutoCompleteResults';
import SearchIcon from '@material-ui/icons/Search';
import {Checkbox, FormControlLabel, InputBase} from "@material-ui/core"
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from "prop-types";
import { SET_SHOW_MENU_FILTERS } from 'redux-store/types';
import "./Autocomplete.scss"
import { autocompleteSearch } from 'redux-store/actions/searchActions';

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

const AutoComplete = (props) => {
  // Props
  const { showFilters, searchResults } = props

  // Hooks
  const dispatch = useDispatch()
  const [queryString, setQueryString] = useState('');
  const [results, setResults] = useState([])
  const [checked, setChecked] = useState(false);

  const classes = useStyles();

  const search = async (e) => {
    const query = e?.target?.value || queryString

    if (query.length >= 3) {
      setTimeout(() => {
      }, 200)

      try {
        setResults(["Loading..."])

        let url = `stock/search?query=${query}`
        if (checked) {
          url += '&include_name_in_search=true'
        }

        await props.autocompleteSearch({ url })

        setQueryString(query)
      } catch(err) {
        console.log(err)
      }
    } else {
      setResults([])
      setQueryString('')
    }
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (queryString.length > 0) {
      search()
    }
    // eslint-disable-next-line
  }, [checked])


  useEffect(() => {
    setResults(searchResults)
  }, [searchResults, checked])

  return (
    <div className={classes.search}>
      <div
        className="autocomplete--hidden-container"
        onClick={
        () => showFilters && dispatch({ type: SET_SHOW_MENU_FILTERS, payload: false })}
      >
      </div>

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
          onChange={search}
          onFocus={() => !showFilters && dispatch({ type: SET_SHOW_MENU_FILTERS, payload: true })}
        />

        {showFilters && (
          <FormControlLabel
            className={
            queryString.length >= 1
              ? "autocomplete--checkbox inline tooltip"
                : "autocomplete--checkbox"}
            control={
            <Checkbox
              color="primary"
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
            label={
              queryString.length >= 1
                ? (<span className="tooltiptext">Names</span>)
                  : "Include Names"
            }
          />
        )}

      {results.length > 0 && (
        <div className="autocomplete--results">
          <AutocompleteResults results={results} setResults={setResults}/>
        </div>
      )}
    </div>
  );
}

AutoComplete.propTypes = {
  isMobile: PropTypes.bool,
  showFilters: PropTypes.bool,
  autocompleteSearch: PropTypes.func,
  searchResults: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.responsive.isMobile,
    showFilters: state.general.showSearchFilters,
    searchResults: state.search.searchResults
  }
};

export default connect(mapStateToProps, { autocompleteSearch })(AutoComplete);
