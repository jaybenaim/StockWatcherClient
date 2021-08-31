import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import local from "api/local"
import AutocompleteResults from './AutoCompleteResults';
import SearchIcon from '@material-ui/icons/Search';
import {Checkbox, FormControlLabel, InputBase} from "@material-ui/core"
import "./Autocomplete.scss"
import { connect } from 'react-redux';
// import { getWindowWidth } from 'redux-store/actions/responsiveActions';
// import { SET_WINDOW_WIDTH } from 'redux-store/types';

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
  // const { screenSize, windowWidth, isMobile } = useSelector((state) => state.responsive)
  // const dispatch = useDispatch()
  const classes = useStyles();

  const [results, setResults] = useState([])
  const [checked, setChecked] = useState(false);
  const [showFilters, setShowFilters] = useState(false)

  const autocompleteSearch = async (e) => {
    const query = e.target.value

    if (query.length >= 2) {
      setTimeout(() => {
      }, 200)

      try {
        let url = `stock/search?query=${query}`

        if (checked) {
          url += '&include_name_in_search=true'
        }

        const response = await local.get(url)

        if (response.status === 200) {
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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // useEffect(() => {
  //   window.addEventListener('resize', () => dispatch({ type: SET_WINDOW_WIDTH }))

  //   return () => window.removeEventListener('resize', () => dispatch({ type: SET_WINDOW_WIDTH }))

  // },[screenSize, windowWidth])

  return (
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
          onFocus={() => setShowFilters(true)}
          onBlur={() => setShowFilters(false)}
        />

        {showFilters && (
          <FormControlLabel
            className="autocomplete--checkbox"
            control={
            <Checkbox
              color="primary"
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
            label="Include Names"
          />
        )}


        <div className="autocomplete--results">
          <AutocompleteResults results={results} setResults={setResults}/>
        </div>
    </div>
  );
}

AutoComplete.propTypes = {
  // responsive: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    // responsive: state.responsive
  }
};

export default connect(mapStateToProps, {})(AutoComplete);
