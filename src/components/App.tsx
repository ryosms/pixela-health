import React, {useEffect, useState} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import WeightForm from "./WeightForm";
import firebase from "../config/firebase-settings";
import "firebase/auth";

function App() {
  const [completeLoginCheck, completed] = useState(false);
  const [loginUser, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      completed(true);
    })
  }, []);

  if (!completeLoginCheck) {
    return (
      <React.Fragment>
        <CssBaseline/>
        <Header user={loginUser}/>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <Header user={loginUser}/>
      <Container>
        <WeightForm user={loginUser}/>
      </Container>
    </React.Fragment>
  );
}

export default App;
