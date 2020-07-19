import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import WeightForm from "./WeightForm";


function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Header/>
      <Container>
        <WeightForm/>
      </Container>
    </React.Fragment>
  );
}

export default App;
