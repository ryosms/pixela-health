import React from "react";
import Typography from "@material-ui/core/Typography";
import 'firebase/auth';
import Login from './Login';

export default function WeightForm(props: any) {
  const loginUser = props.user;

  if (!loginUser) {
    return <Login/>
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        体重入力
      </Typography>
    </React.Fragment>
  );
}
