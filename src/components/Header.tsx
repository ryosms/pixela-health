import React, {useCallback} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

function Header() {
  const classes = makeStyles((theme) => ({
    appBar: {
      position: 'absolute',
    },
    title: {
      flexGrow: 1
    }
  }))();

  const googleLogin = useCallback(() => {
    alert("login")
  }, []);

  return (
    <React.Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            Pixela Health
          </Typography>
          <Button color="inherit" onClick={googleLogin}>
            Login with Google
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
