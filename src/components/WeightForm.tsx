import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import firebase from '../config/firebase-settings';
import 'firebase/auth';
import Login from './Login';

export default function WeightForm() {
  console.log("start");
  const [isInitialized, initialized] = useState(false);
  const [loginUser, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      initialized(true);
    });
    console.log("effect");
  }, []);

  if (!isInitialized) {
    console.log("empty");
    return <React.Fragment/>
  }
  if (!loginUser) {
    console.log("must login");
    return <Login/>
  }
  console.log("logged in");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        体重入力
      </Typography>
    </React.Fragment>
  );
}
