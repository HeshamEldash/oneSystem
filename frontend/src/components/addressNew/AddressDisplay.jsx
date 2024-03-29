import React from "react";
import NoShadowContainer from "../ui/containers/NoShadowContainer";
import SmallButton from "../ui/SmallButton";

import AddressBox from "./AddressBox";
import AddressUpdate from "./AddressUpdate";
import useAddress from "./useAddress";

function AddressDisplay({ address, apiUpdate }) {
  /*
   The apiCall prop is the api function that allows this
   component to be used with multiple types of address 
   it should be a callback function with the data passed to it 
   Basically the function the actually deals with the api is called in the 
   Owner component {brnach, provider, staff, patient}
   
   */

  const { update, values, setUpdate, handleChange, submit } = useAddress(
    address,
    apiUpdate
  );

  return (
      <NoShadowContainer>
      {update ? (
        <AddressUpdate
          values={values}
          handleChange={handleChange}
          submit={submit}
        />
      ) : (
        <AddressBox address={values} />
      )}

      {!update && 
        <SmallButton
          onClick={() => setUpdate(true)}
          value="update"
        />
      }
      </NoShadowContainer>
  );
}

export default AddressDisplay;
