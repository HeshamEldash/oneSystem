import React from "react";
import { useTranslation } from "react-i18next";
import MediumInput from "../../components/ui/inputs/MediumInput";
import SmallButton from "../ui/SmallButton";

function AddressUpdate({ values, handleChange, submit }) {
  const { t } = useTranslation();

  return (
    <div>
      <MediumInput
        label={t("unit_number")}
        value={values.unit_number}
        onChange={handleChange}
        name="unit_number"
      />
      <MediumInput
        label={t("first_line")}
        value={values.first_line}
        onChange={handleChange}
        name="first_line"
      />

      <MediumInput
        label={t("second_line")}
        value={values.second_line}
        onChange={handleChange}
        name="second_line"
      />

      <MediumInput
        label={t("city")}
        value={values.city}
        onChange={handleChange}
        name="city"
      />

      <MediumInput
        label={t("governorate")}
        value={values.governorate}
        onChange={handleChange}
        name="governorate"
      />
      <SmallButton onClick={() => submit()} value="submit" />
    </div>
  );
}

export default AddressUpdate;
