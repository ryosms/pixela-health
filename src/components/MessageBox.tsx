import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export type MessageBoxKind = "success" | "info" | "warning" | "error"

export interface MessageBoxProps {
  message: string | null

  handleClose(): any

  kind: MessageBoxKind
}

export default function MessageBox(props: MessageBoxProps) {
  return (
    <React.Fragment>
      <Snackbar open={!!props.message} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={props.kind}>
          {props.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );

}