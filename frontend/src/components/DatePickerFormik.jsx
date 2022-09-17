import React from "react";
import { Formik, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

function DatePickerFormik({...props}) {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

  return (
   <DatePicker
    //    className={
    //           errors.telephoneNumber && touched.telephoneNumber
    //             ? "input-error form-fields"
    //             : "form-fields"
    //         }

      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  )
}

export default DatePickerFormik

