import react, { createContext, useState, useEffect, useContext } from "react";
import {RecordContext} from "./RecordContext";


 const useRecordContext = () => {
    // get the context
    const {contextData} = useContext(RecordContext);
  
    // if `undefined`, throw an error
    if (contextData === undefined) {
      throw new Error("useUserContext was used outside of its Provider");
    }
  
    return contextData;
  };

  export  {useRecordContext}