import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "firebase/auth";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import JapaneseDatePicker from "src/components/JapaneseDatePicker";
import {Pixela, ScaledWeight} from "src/libs/pixela";
import Progress from "./Progress";

const numberPattern = /^(\d+\.\d+)$|^\d+$/i
const integerPattern = /^\d+$/i

export default function WeightForm() {
  const {register, errors, handleSubmit} = useForm<ScaledWeight>();
  const [processing, setProcessing] = useState(false);
  const [scaledDate, setScaledDate] = React.useState<Date | null>(
    new Date(),
  );

  const username = `${process.env['REACT_APP_PIXELA_USERNAME']}`;
  const token = `${process.env['REACT_APP_PIXELA_TOKEN']}`;
  const graphId = `${process.env['REACT_APP_PIXELA_GRAPH_ID']}`;
  console.log(graphId);

  const onSubmit = (data: ScaledWeight) => {
    setProcessing(true);
    data.scaledDate = scaledDate;
    Pixela.create(username, token, graphId).register(data)
      .then(result => console.log(result))
      .catch(err => console.log(err))
      .finally(() => setProcessing(false));
  }

  return (
    <React.Fragment>
      <Progress processing={processing}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title={"体重入力"}/>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <JapaneseDatePicker
                  required
                  id="scaled-date"
                  label="測定日"
                  value={scaledDate}
                  onChange={setScaledDate}
                  disabled={processing}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="weight"
                  label="体重 *"
                  fullWidth
                  disabled={processing}
                  inputRef={register({required: true, pattern: numberPattern})}
                  error={!!errors.weight}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="bodyFatPercentage"
                  label="体脂肪率"
                  fullWidth
                  disabled={processing}
                  inputRef={register({pattern: numberPattern})}
                  error={!!errors.bodyFatPercentage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="visceralFatLevel"
                  label="内臓脂肪レベル"
                  fullWidth
                  disabled={processing}
                  inputRef={register({pattern: numberPattern})}
                  error={!!errors.visceralFatLevel}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="skeletalMusclePercentage"
                  label="骨格筋率"
                  fullWidth
                  disabled={processing}
                  inputRef={register({pattern: numberPattern})}
                  error={!!errors.skeletalMusclePercentage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="physicalAge"
                  label="体年齢"
                  fullWidth
                  disabled={processing}
                  inputRef={register({pattern: integerPattern})}
                  error={!!errors.physicalAge}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="basalMetabolism"
                  label="基礎代謝"
                  fullWidth
                  disabled={processing}
                  inputRef={register({pattern: integerPattern})}
                  error={!!errors.basalMetabolism}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="bmi"
                  label="BMI"
                  fullWidth
                  disabled={processing}
                  inputRef={register({pattern: numberPattern})}
                  error={!!errors.bmi}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" type="submit" disabled={processing}>登録</Button>
          </CardActions>
        </Card>
      </form>
    </React.Fragment>
  );
}
