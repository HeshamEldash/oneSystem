import React from "react";
import { updateBranchTelephoneList } from "../../pages/provider/api/providerApi";
import MediumInput from "../ui/inputs/MediumInput";
import SmallButton from "../ui/SmallButton";
import TelephoneBox from "./TelephoneBox";
import TelephoneUpdate from "./TelephoneUpdate";
import useTelephoneUpdate from "./useTelephoneUpdate";

function TelephoneDisplay({ telephone_numbers_list, apiUpdate }) {
  /*
   The apiCall prop is the api function that allows this
   component to be used with multiple types of telephone 
   it should be a callback function with the data passed to it 
   Basically the function the actually deals with the api is called in the 
   Owner component {brnach, provider, staff, patient}
   
   */


  const { update, values, handleChange, setUpdate, submit, addNewPhone, removePhone } =
    useTelephoneUpdate(telephone_numbers_list, apiUpdate);


  return (
    <div className="inner-page-box inner-page-box--flex box_mins_width">
      {update ? (
        <TelephoneUpdate
          values={values}
          submit={submit}
          addNewPhone={addNewPhone}
          handleChange={handleChange}
          removePhone={removePhone}
        />
      ) : (
        <div>
          {values?.map((number, index) => {
            return (
              <TelephoneBox
                key={number}
                index={index + 1}
                telephone_number={number}
              />
            );
          })}
        </div>
      )}

      {!update && (
        <SmallButton onClick={() => setUpdate(true)} value="update" />
      )}
    </div>
  );
}

export default TelephoneDisplay;
