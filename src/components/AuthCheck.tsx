import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "src/libs/firebase-settings";
import "firebase/auth";

export default function AuthCheck(props: any) {
  const [isChecked, setChecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setSignedIn(!!user);
      setChecked(true);
    })
  }, []);

  if (!isChecked) {
    return (
      <React.Fragment>
        <Backdrop open={true}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </React.Fragment>
    )
  }
  if (signedIn) {
    return props.children;
  }
  return <Redirect to="/login"/>
}