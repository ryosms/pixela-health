import React, {useCallback, useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from '../config/firebase-settings';
import 'firebase/auth';

const authStyles = makeStyles((_) => ({
  avatar: {
    margin: 10,
  },
}));

function AuthButton() {
  const classes = authStyles();
  const [user, setUser] = useState({isLogin: false, name: '', iconUrl: ''});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        setUser({isLogin: true, name: `${user.displayName}`, iconUrl: `${user.photoURL}`});
      } else {
        setUser({isLogin: false, name: '', iconUrl: ''});
      }
    });
  }, []);

  const logout = useCallback(() => {
    firebase.auth().signOut().catch(err => console.error(err));
  }, []);

  if (!user.isLogin) {
    return <React.Fragment/>
  }

  return (
    <React.Fragment>
      <Button color="inherit">
        <Avatar alt="profile image" src={user.iconUrl}
                className={classes.avatar} title={user.name}/>
      </Button>
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    </React.Fragment>
  );
}

function Header() {
  const classes = makeStyles((_) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      flexGrow: 1
    }
  }))();

  return (
    <React.Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            Pixela Health
          </Typography>
          <AuthButton/>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
