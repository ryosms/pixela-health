import React, {useCallback, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from "../config/firebase-settings";
import 'firebase/auth';

function Login() {
  const [isLogin, setLoginState] = useState(false);
  const [isInitialized, initialized] = useState(false);

  const classes = makeStyles((_) => ({
    container: {
      marginTop: 30,
      marginLeft: 30,
    }
  }))();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      initialized(true);
      setLoginState(!!user);
    });
  });

  const login = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).catch(err => console.error(err));
  }, []);

  if (isLogin || !isInitialized) {
    return <React.Fragment/>;
  }
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
