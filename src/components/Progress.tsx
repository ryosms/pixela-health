import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Progress(props: any) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Backdrop open={props.processing} className={classes.backdrop}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </React.Fragment>
  );

}