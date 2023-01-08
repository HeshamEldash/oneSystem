import React, { useState } from "react";
import { useFormik } from "formik";

function useAddress(initialValues, apiCallFunction) {

  const [update, setUpdate] = useState(false);

  const { values, handleChange } = useFormik({
    initialValues: initialValues,
  });

  const submit = () => {
    setUpdate(false);
    apiCallFunction(values)
  };

  return {
    values: values,
    update: update,
    submit: submit,
    handleChange: handleChange,
    setUpdate: setUpdate,
  };
}

export default useAddress;
