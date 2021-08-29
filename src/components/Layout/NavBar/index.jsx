import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
// import Link from "@material-ui/core/Link"

import "./navbar.scss";
import AutoComplete from 'components/AutoComplete/AutoComplete';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#fff',
    fontWeight: '600'
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const firebase = useFirebase();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => !state.firebase.auth.isEmpty);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("signed out");
        history.push("/sign-in");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'main-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
         <Link to="/home">
          Home
        </Link>
      </MenuItem>

      {isLoggedIn ? (
        <div>
          <Link to="/admin" className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary">
            <MenuItem onClick={handleMenuClose}>
                Account
            </MenuItem>
          </Link>

          <MenuItem onClick={signOut}>
            Logout
          </MenuItem>
        </div>
        ) : (
        <MenuItem onClick={handleMenuClose}>
          <Link to="/sign-in">Sign In</Link>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'main-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
         <Link to="/home">
          Home
        </Link>
      </MenuItem>

      {isLoggedIn ? (
        <div>
          <Link to="/admin">
            <MenuItem onClick={handleMenuClose}>
              Account
            </MenuItem>
          </Link>

            <MenuItem onClick={signOut}>
              <Link to="/sign-in">
                Logout
              </Link>
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <Link to="/sign-in">Sign In</Link>
          </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className="grow main-nav-menu">
      <AppBar position="static">
        <Toolbar>
          <Link to="/home">
            <Typography className={classes.title} variant="h6" noWrap>
              Stock Watcher
            </Typography>
          </Link>

          <AutoComplete />

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <Link to="/admin">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
