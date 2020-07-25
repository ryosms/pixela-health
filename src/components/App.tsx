import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "src/components/Header";
import WeightForm from "src/components/WeightForm";
import Login from "src/components/Login";
import AuthCheck from "src/components/AuthCheck";

function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Header/>
      <Container>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <AuthCheck>
              <Switch>
                <Route exact path="/" component={WeightForm}/>
              </Switch>
            </AuthCheck>
          </Switch>
        </BrowserRouter>
      </Container>
    </React.Fragment>
  );
}

export default App;
