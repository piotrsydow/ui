import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  EvnCloseLoginDialog,
  EvnOpenLoginDialog,
  EvnLoginUser
} from "./Reducer";

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: null, password: null };
  }
  executeLogin(userName) {
    // TODO: real login
    this.props.onLogin(userName, 1);
    this.props.onClose();
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.executeLogin(this.state.userName);
    }
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.loginDialogOpened}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>kuku</DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User name"
              type="name"
              onChange={e => {
                this.setState({ userName: e.target.value });
              }}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                // console.log("sing in");
                this.executeLogin(this.state.userName);
              }}
              color="primary"
            >
              Sign in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  var x = {
    loginDialogOpened: state.loginDialogOpened
  };
  return x;
};

const mapDispachToProps = dispach => {
  var x = {
    onClose: () => {
      dispach(EvnCloseLoginDialog());
    },
    onOpen: () => {
      dispach(EvnOpenLoginDialog());
    },
    onLogin: (userName, userLevel) => {
      dispach(EvnLoginUser(userName, userLevel));
    }
  };
  return x;
};

export const LoginDialogContainer = connect(
  mapStateToProps,
  mapDispachToProps
)(LoginDialog);
