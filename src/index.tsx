import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}/>
      </Switch>
    </BrowserRouter>
    <CssBaseline/>
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Pixela Health
        </Typography>
      </Toolbar>
    </AppBar>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
