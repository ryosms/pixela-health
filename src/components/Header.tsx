import React, {useCallback, useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from '../libs/firebase-settings';
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

  const [menuTrigger, setMenuTrigger] = useState<null | HTMLElement>(null);

  const menuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuTrigger(event.currentTarget);
  };

  const menuClose = () => {
    setMenuTrigger(null);
  }

  const logout = useCallback(() => {
    menuClose();
    firebase.auth().signOut().catch(err => console.error(err));
  }, []);

  if (!user) {
    return <React.Fragment/>
  }
  const url = `${user.photoURL}`;
  const name = `${user.displayName}`;
  return (
    <React.Fragment>
      <Button color="inherit" aria-controls="logout-menu" aria-haspopup="true" onClick={menuOpen}>
        <Avatar alt="profile image" src={url} className={classes.avatar} title={name}/>
      </Button>
      <Menu id="logout-menu" anchorEl={menuTrigger} keepMounted open={Boolean(menuTrigger)} onClose={menuClose}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function Header() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  });

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
          <AuthButton user={user}/>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
