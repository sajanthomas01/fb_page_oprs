import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";

export default function NavigationWrapper() {
  // for simplicity we store access token in state
  // and pass via props, if refreshed its gone but
  // just for demo it is fine
  const [userInfo, setUserInfo] = React.useState({
    token: "token",
    userId: ""
  });

  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <PrivateRoute path="/dashboard" userInfo={userInfo}>
            <Dashboard userInfo={userInfo}/>
          </PrivateRoute>
          <Route path="/">
            <Login setUserInfo={setUserInfo}/>
          </Route>
        </Switch>
    </Router>
  );
}

// simple auth guard, just for demo
function PrivateRoute ({ children, ...rest }) {

  return (
    <Route {...rest} render={() => {
      return rest.userInfo.token !== ""
        ? children
        : <Redirect to='/' />
    }} />
  )
}