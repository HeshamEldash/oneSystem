import * as yup from "yup";
import { useTranslation } from "react-i18next";


import i18next from "i18next";

const requiredError = i18next.t("required_error")



export const schedulerSchema = yup.object().shape({
    
    startHour: yup.string().required("Start hour is required"),
    selectedStartMinute: yup.string().required(requiredError),
    endHour: yup.string().required(requiredError),
    endMinute: yup.string().required(requiredError),
    slotDuration: yup.number().required(requiredError).positive().integer(),
    selectedClinic: yup.number().required(requiredError).positive().integer(),
  });


