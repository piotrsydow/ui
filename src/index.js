import React, { Component } from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import { EnvListContainer } from "./EnvList";
import * as serviceWorker from "./serviceWorker";
import { BarContainer } from "./Bar";
import { LoginDialogContainer } from "./LoginDialog";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import { NewEnvFormContainer } from "./NewEnvForm";
// import { ItemListContainer, reducer } from "./Example";
import { reducer } from "./Reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BarContainer />
      <LoginDialogContainer />
      <EnvListContainer />
      <NewEnvFormContainer />
      {/* <ItemListContainer /> */}
    </div>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
