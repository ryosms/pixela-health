import React, {useCallback} from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from "../config/firebase-settings";
import 'firebase/auth';

function Login() {
  const classes = makeStyles((_) => ({
    container: {
      marginTop: 30,
      marginLeft: 30,
    }
  }))();

  const login = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).catch(err => console.error(err));
  }, []);

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Button variant="contained" color="primary" onClick={login}>
          Login with Google
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Login;
