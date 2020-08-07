import React from "react";
import {Redirect} from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "src/libs/firebase-settings";
import "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

export default function AuthCheck(props: any) {
  const [user, loading] = useAuthState(firebase.auth());

  if (loading) {
    return (
      <React.Fragment>
        <Backdrop open={true}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </React.Fragment>
    )
  }
  if (!!user) {
    return props.children;
  }
  return <Redirect to="/login"/>
}