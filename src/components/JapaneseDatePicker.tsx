import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import jaLocale from "date-fns/locale/ja";
import {DatePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";

class JapaneseDateFnsUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, "yyyy MMM", {locale: this.locale});
  }

  getDatePickerHeaderText(date: Date) {
    return format(date, "MMMdo（E）", {locale: this.locale});
  }
}

export default function JapaneseDatePicker(props: any) {
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={JapaneseDateFnsUtils} locale={jaLocale}>
        <DatePicker
          id={props.id}
          label={props.label}
          format="yyyy/MM/dd"
          value={props.value}
          onChange={props.onChange}
          fullWidth
        />
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}
