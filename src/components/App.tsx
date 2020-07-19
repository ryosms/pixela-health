import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Login from "./Login";


function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Header/>
      <Container>
        <Login/>
      </Container>
    </React.Fragment>
  );
}

export default App;
