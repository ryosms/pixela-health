import React, {useCallback} from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from '../config/firebase-settings';
import 'firebase/auth';
import {User} from 'firebase';

const authStyles = makeStyles((_) => ({
  avatar: {
    margin: 10,
  },
}));

function AuthButton(props: any) {
  const user: User | null = props.user;
  const classes = authStyles();

  const logout = useCallback(() => {
    firebase.auth().signOut().catch(err => console.error(err));
  }, []);

  if (!user) {
    return <React.Fragment/>
  }
  const url = `${user.photoURL}`;
  const name = `${user.displayName}`;
  return (
    <React.Fragment>
      <Button color="inherit">
        <Avatar alt="profile image" src={url}
                className={classes.avatar} title={name}/>
      </Button>
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    </React.Fragment>
  );
}

function Header(props: any) {
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
          <AuthButton user={props.user}/>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
