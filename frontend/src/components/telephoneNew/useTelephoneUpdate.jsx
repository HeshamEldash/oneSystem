import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { tr } from "date-fns/locale";

function useTelephoneUpdate(telephone_numbers_list, apiCallFunction) {
  const [update, setUpdate] = useState(false);

  const numbers = telephone_numbers_list?.map((item) => item.telephone_number);

  const { setValues, values, handleChange, setFieldValue } = useFormik({
    initialValues: numbers,
    enableReinitialize:true 
  });



  const submit = () => {
    setUpdate(false);
    apiCallFunction(values);
  };


  const addNewPhone = () => {

    if (values === undefined){
      setValues([""])
    }else{
    setFieldValue(values.length, "");
  }
  };

  const removePhone = (index) => {
    let item = values[index];

    setValues(
      values.filter((val) => {
        return val != item;
      })
    );
  };

  return {
    values: values,
    update: update,
    submit: submit,
    handleChange: handleChange,
    setUpdate: setUpdate,
    addNewPhone: addNewPhone,
    removePhone: removePhone,
  };
}

export default useTelephoneUpdate;
