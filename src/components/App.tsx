import React, {useEffect, useState} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import WeightForm from "./WeightForm";
import firebase from "../config/firebase-settings";
import "firebase/auth";
import Login from "./Login";

function App() {
  const [completeLoginCheck, completed] = useState(false);
  const [loginUser, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      completed(true);
    })
  }, []);

  return (
    <React.Fragment>
      <CssBaseline/>
      <Header user={loginUser}/>
      <Container>
        {selectDisplayComponent(completeLoginCheck, loginUser)}
      </Container>
    </React.Fragment>
  );
}

export default App;

function selectDisplayComponent(checkCompleted: boolean, user: any): JSX.Element {
  if (!checkCompleted) {
    return <React.Fragment/>
  }
  if (!user) {
    return <Login/>
  }
  return <WeightForm/>
}