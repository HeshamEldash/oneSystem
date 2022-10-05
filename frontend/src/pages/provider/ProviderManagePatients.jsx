import React, { useState } from "react";
import Circle from "../../components/Circle";
import GetAllRegisteredPatients from "./components/GetAllRegisteredPatients";

function ProviderManagePatients() {
  const [openAllPatients, setOpenAllPatients] = useState(false);
  const [numberOfPatinets, setNumberOfPatients] = useState();
  return (
    <div className="primary--page-box">
      <div className="inner-page-box--flex-row align-items-center space_between margin_bottom_medium">
        <input
          type="button"
          className="page_button page_button-padding-inline-small"
          onClick={() => setOpenAllPatients((prev) => !prev)}
          value={"get_all_patients"}
        />
        <div>
          <Circle>{numberOfPatinets && numberOfPatinets}</Circle>
        </div>
      </div>
      {!!openAllPatients && (
        <GetAllRegisteredPatients setNumberOfPatients={setNumberOfPatients} />
      )}
    </div>
  );
}

export default ProviderManagePatients;
