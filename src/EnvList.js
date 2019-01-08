import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// import MoreIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { EvnDeleteEnvById } from "./Reducer";

import { connect } from "react-redux";
let id = 0;
function createData(id, projectName, snapshot, owner, status) {
  return { id, projectName, snapshot, owner, status };
}

const rows = [
  createData("1", "project A", "GA5.40", "piotr.sydow", "01:12"),
  createData("2", "project B", "GA5.50.1", "asdad.ddsa", "12:11"),
  createData("3", "project C", "GA5.50.1_add_ba", "sddssss.ssdf", "00:02"),
  createData("4", "project D", "GA5.40.3", "sfses.dfssdsd", "00:15"),
  createData("5", "project E", "GA5.50", "sdffw.wfff", "01:00")
];

// function getEnviromentList() {
//   row.push(createData("project A", "GA5.40", "piotr.sydow", "01:12"))
// }

class EnvList extends Component {
  state = {
    anchorElItemMenu: null,
    rowId: null
  };

  handleCloseItemMenu = event => {
    // console.log(this.state.rowId);
    this.setState({ anchorElItemMenu: null });
  };

  handleDeleteEnv = event => {
    this.props.deleteEnvById(this.state.rowId);
    this.handleCloseItemMenu(event);
  };

  handleOpenItemMenu = (event, rowId) => {
    this.setState({ anchorElItemMenu: event.currentTarget, rowId: rowId });
    // this.setState({ rowId: rowId });
  };

  render() {
    const { anchorElItemMenu } = this.state;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric> Snapshot</TableCell>
              <TableCell numeric>Owner</TableCell>
              <TableCell numeric>Time to die/Status</TableCell>
              <TableCell numeric />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.envList.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell numeric>{row.snapshot}</TableCell>
                  <TableCell numeric>{row.owner}</TableCell>
                  <TableCell numeric>{row.status}</TableCell>
                  <TableCell numeric>
                    <IconButton
                      color="inherit"
                      onClick={event => {
                        this.handleOpenItemMenu(event, row.id);
                      }}
                    >
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Menu
          id="simple-menu"
          anchorEl={anchorElItemMenu}
          open={Boolean(anchorElItemMenu)}
          onClose={this.handleCloseItemMenu}
        >
          <MenuItem onClick={this.handleCloseItemMenu}>Change owner</MenuItem>
          <MenuItem onClick={this.handleCloseItemMenu}>Get details</MenuItem>
          <MenuItem onClick={this.handleDeleteEnv}>Close</MenuItem>
          <MenuItem onClick={this.handleCloseItemMenu}>
            Refresh die counter
          </MenuItem>
          <MenuItem onClick={this.handleCloseItemMenu}>
            Manage snapshots
          </MenuItem>
        </Menu>
      </Paper>
    );
  }
}

// export default withStyles(styles)(App);
// export default EnvList;
const mapStateToProps = state => {
  var x = {
    envList: state.envList
  };
  // console.log(x);
  return x;
};

const mapDispachToProps = dispach => {
  var x = {
    deleteEnvById: id => {
      dispach(EvnDeleteEnvById(id));
    }
  };
  return x;
};

export const EnvListContainer = connect(
  mapStateToProps,
  mapDispachToProps
)(EnvList);
