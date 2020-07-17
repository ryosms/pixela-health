import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Pixela Health
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default App;
