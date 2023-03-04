import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Circle from "../../components/Circle";
import { useGetNumberOfRegisteredPatients } from "./api/useProviderDataApi";
import GetAllRegisteredPatients from "./components/GetAllRegisteredPatients";
import { ProviderContext } from "./context/ProviderContext";

function ProviderManagePatients() {
  const {t}= useTranslation()
  const {providerId}= useContext(ProviderContext)
  const [openAllPatients, setOpenAllPatients] = useState(false);

  const [numberOfPatinetds, setNumberOfPatients] = useState();

 const  { isLoading, isError, data:numberOfPatinets, error } = useGetNumberOfRegisteredPatients(providerId)


  return (
    <div className="primary--page-box">
      <div className="inner-page-box--flex-row align-items-center space_between margin_bottom_medium">
        <input
          type="button"
          className="page_button page_button-padding-inline-small"
          onClick={() => setOpenAllPatients((prev) => !prev)}
          value={t("Get all patients")}
        />
        <div>
          <Circle>{numberOfPatinets && numberOfPatinets?.patient_count}</Circle>
        </div>
      </div>
      {!!openAllPatients && (
        <GetAllRegisteredPatients setNumberOfPatients={setNumberOfPatients} />
      )}
    </div>
  );
}

export default ProviderManagePatients;
