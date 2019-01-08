export const EvnLogoutUser = () => {
  return {
    type: "LOGOUT_USER"
  };
};

export const EvnOpenLoginDialog = () => {
  return {
    type: "OPEN_LOGIN_DIALOG"
  };
};

export const EvnLoginUser = (userName, userLevel) => {
  return {
    type: "LOGIN_USER",
    userName: userName,
    userLevel: userLevel
  };
};

export const EvnCloseLoginDialog = () => {
  return {
    type: "CLOSE_LOGIN_DIALOG"
  };
};

export const EvnOpenNewEnvForm = () => {
  return {
    type: "OPEN_NEW_ENV_FORM"
  };
};

export const EvnCloseNewEnvForm = () => {
  return {
    type: "CLOSE_NEW_ENV_FORM"
  };
};

export const EvnDeleteEnvById = id => {
  return {
    type: "DELETE_ENV_BY_ID",
    id: id
  };
};

export const EvnAddEnv = (id, projectName, snapshot, owner, status) => {
  return {
    type: "ADD_ENV",
    id: id,
    projectName: projectName,
    snapshot: snapshot,
    owner: owner,
    status: status
  };
};

function deleteEnvById(envList, id) {
  for (var i = envList.length - 1; i >= 0; i--) {
    if (envList[i].id === id) {
      envList.splice(i, 1);
    }
  }
}

export const reducer = (
  state = {
    currentUser: "nullxx",
    userLevel: 0,
    newEnvFormOpened: false,
    loginDialogOpened: false,
    envList: [
      // { id: "1", projectName: "pn", snapshot: "sn", owner: "ow", status: "ok" }
    ]
  },
  action
) => {
  // console.log(state);
  var newState = Object.assign({}, state);
  newState.envList = state.envList.slice();
  // console.log(newState);
  switch (action.type) {
    case "DELETE_ENV_BY_ID":
      deleteEnvById(newState.envList, action.id);
      return newState;
    case "ADD_ENV":
      // console.log("add env");
      newState.envList.push({
        id: action.id,
        projectName: action.projectName,
        snapshot: action.snapshot,
        owner: action.owner,
        status: action.status
      });
      // console.log(state);
      // console.log(newState);
      return newState;
    case "OPEN_NEW_ENV_FORM":
      newState.newEnvFormOpened = true;
      return newState;
    case "CLOSE_NEW_ENV_FORM":
      newState.newEnvFormOpened = false;
      return newState;
    case "LOGIN_USER":
      newState.currentUser = action.userName;
      newState.userLevel = action.userLevel;
      return newState;
    case "LOGOUT_USER":
      newState.currentUser = null;
      newState.userLevel = 0;
      return newState;
    case "OPEN_LOGIN_DIALOG":
      newState.loginDialogOpened = true;
      return newState;
    case "CLOSE_LOGIN_DIALOG":
      newState.loginDialogOpened = false;
      return newState;
    default:
      return state;
  }
};
