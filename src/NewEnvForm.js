import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { EvnCloseNewEnvForm, EvnAddEnv } from "./Reducer";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class NewEnvForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      environmentName: null,
      password: null,
      template: "",
      snapshot: ""
    };
  }
  executeSubmit() {
    // this.setState({ price: event.target.value });
    const id = Math.floor((1 + Math.random()) * 0x1000000);
    this.props.onSubmit(
      id,
      this.state.environmentName,
      this.state.snapshot,
      this.props.currentUser,
      "unknown"
    );
    this.props.onClose();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.newEnvFormOpened}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New environment spec</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>kuku</DialogContentText> */}
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  autoFocus
                  //   margin="dense"
                  inputProps={{
                    name: "environmentName",
                    id: "environmentName-simple"
                  }}
                  label="Name"
                  type="name"
                  onChange={this.handleChange}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel>Template</InputLabel>
                <Select
                  //   value={this.state.templateName}
                  value={this.state.template}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "template",
                    id: "template-simple"
                  }}
                >
                  <MenuItem value="Andromeda">Andromeda</MenuItem>
                  <MenuItem value="Venus">Venus</MenuItem>
                  <MenuItem value="GA">GA</MenuItem>
                  <MenuItem value="Valhal">Valhal</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel>Snapshot</InputLabel>
                <Select
                  //   value={this.state.templateName}
                  value={this.state.snapshot}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "snapshot",
                    id: "snapshot-simple"
                  }}
                >
                  <MenuItem value="V1">V1</MenuItem>
                  <MenuItem value="V2">V2</MenuItem>
                  <MenuItem value="V3">V3</MenuItem>
                  <MenuItem value="V4">V4</MenuItem>
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.executeSubmit();
              }}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  var x = {
    newEnvFormOpened: state.newEnvFormOpened,
    currentUser: state.currentUser
  };
  return x;
};

const mapDispachToProps = dispach => {
  var x = {
    onClose: () => {
      dispach(EvnCloseNewEnvForm());
    },
    onSubmit: (id, projectName, snapshot, owner, status) => {
      dispach(EvnAddEnv(id, projectName, snapshot, owner, status));
    }
  };
  return x;
};

export const NewEnvFormContainer = connect(
  mapStateToProps,
  mapDispachToProps
)(withStyles(styles)(NewEnvForm));
