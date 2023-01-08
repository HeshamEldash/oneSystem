import React from "react";
import { useTranslation } from "react-i18next";

function AddressBox({ address }) {
  const { t } = useTranslation();

  return (
    <div className="inner-page-box--flex">
      <label className="label">
        {t("unit_number")}:
        <span> {address?.unit_number}</span>
      </label>
      <label className="label">
        {t("first_line")}:
        <span> { address?.first_line}</span>
      </label>
      <label className="label">
        {t("second_line")}:
        <span> { address?.second_line}</span>
      </label>
      <label className="label">
        
        {t("city")}:
        <span> { address?.city}</span>
      </label>
      <label className="label">
        {t("governorate")}:
        <span> {address?.governorate}</span>
      </label>
    </div>
  );
}

export default AddressBox;
