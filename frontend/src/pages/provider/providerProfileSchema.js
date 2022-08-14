import * as yup from "yup";
import { setLocale } from 'yup';
import { useTranslation } from "react-i18next";

import i18next from "i18next";


export const providerProfileSchema = yup.object().shape({
    
    name: yup.string().required(i18next.t("required_error")),
    telephoneNumber: yup.string(),
    address: yup.string(),


  });