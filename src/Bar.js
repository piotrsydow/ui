import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import MoreIcon from "@material-ui/icons/MoreVert";
// import SearchIcon from "@material-ui/icons/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import logo from "./logo.svg";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";
import { EvnLoginUser } from "./LoginDialog";
import {
  EvnLogoutUser,
  EvnOpenLoginDialog,
  EvnOpenNewEnvForm
} from "./Reducer";
const styles = theme => ({
  root: {
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
    marginRight: 20
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class Bar extends Component {
  state = {
    anchorElLogin: null,
    anchorElMenu: null
  };

  handleUserClick = event => {
    this.setState({ anchorElLogin: event.currentTarget });
  };

  handleMenuClick = event => {
    this.setState({ anchorElMenu: event.currentTarget });
  };

  handleCloseUserDialog = event => {
    this.setState({ anchorElLogin: null });
  };

  handleLogin = event => {
    this.handleCloseUserDialog(event);
    // this.setState({ auth: true });
  };

  handleLogout = event => {
    this.handleCloseUserDialog(event);
    // this.setState({ auth: false });
  };

  handleCloseMenu = event => {
    this.setState({ anchorElMenu: null });
  };

  handleCreateNewEnv = event => {
    this.handleCloseMenu(event);
    this.props.onOpenNewEnvForm();
  };

  render() {
    const { classes } = this.props;
    const { anchorElLogin, anchorElMenu } = this.state;
    const logmenuOpened = true;
    var loginName = null;
    var loginButton = null;

    if (this.props.userLevel != 0) {
      loginName = (
        <Typography variant="h6" color="inherit">
          {this.props.currentUser}
        </Typography>
      );
    }

    if (this.props.userLevel != 0) {
      loginButton = (
        <IconButton
          aria-owns="menu-appbar"
          aria-haspopup="true"
          onClick={this.handleUserClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      );
    } else {
      loginButton = (
        <Button
          color="secondary"
          color="inherit"
          onClick={() => {
            this.props.onOpenLoginDialog();
          }}
        >
          Sign in
        </Button>
      );
    }

    return (
      <Paper>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Test enviroment list
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              {loginName}
              {loginButton}

              <Menu
                id="simple-menu"
                anchorEl={anchorElLogin}
                open={Boolean(anchorElLogin)}
                onClose={this.handleCloseUserDialog}
              >
                {this.props.userLevel && (
                  <MenuItem
                    onClick={e => {
                      this.handleLogout(e);
                      this.props.onLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                )}
                {!this.props.userLevel && (
                  <MenuItem
                    onClick={e => {
                      this.handleLogin(e);
                    }}
                  >
                    Login
                  </MenuItem>
                )}
              </Menu>
              <Menu
                id="simple-menu"
                anchorEl={anchorElMenu}
                open={Boolean(anchorElMenu)}
                onClose={this.handleCloseMenu}
              >
                <MenuItem onClick={this.handleCreateNewEnv}>
                  Create new
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
      </Paper>
    );
  }
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  var x = {
    currentUser: state.currentUser,
    userLevel: state.userLevel
  };
  return x;
};

const mapDispachToProps = dispach => {
  var x = {
    onLogout: userName => {
      dispach(EvnLogoutUser(userName));
    },
    onOpenLoginDialog: () => {
      dispach(EvnOpenLoginDialog());
    },
    onOpenNewEnvForm: () => {
      dispach(EvnOpenNewEnvForm());
    }
  };
  return x;
};

export const BarContainer = connect(
  mapStateToProps,
  mapDispachToProps
)(withStyles(styles)(Bar));

// export default withStyles(styles)(Bar);

// export default Bar;
