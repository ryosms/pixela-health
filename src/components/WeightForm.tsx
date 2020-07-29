import React from "react";
import "firebase/auth";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import JapaneseDatePicker from "src/components/JapaneseDatePicker";

export default function WeightForm() {
  const [scaledDate, setScaledDate] = React.useState<Date | null>(
    new Date(),
  );

  return (
    <React.Fragment>
      <Card>
        <CardHeader title={"体重入力"}/>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <JapaneseDatePicker required id="scaled-date" label="測定日" value={scaledDate} onChange={setScaledDate}/>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField required id="weight" name="weight" label="体重" fullWidth/>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="体脂肪率" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="内臓脂肪レベル" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="骨格筋率" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="体年齢" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="基礎代謝" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="BMI" fullWidth/>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">登録</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
