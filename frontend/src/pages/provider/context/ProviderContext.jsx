import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { createLogin } from "../../../utils/api_calls/getLogins";
export const ProviderContext = createContext();

export default function ProviderContextProvider(props) {


  const { id } = useParams();
  



  useEffect(() => {
    console.log("in")
    const dont = true

    if (dont) return ()=> console.log("logged")
  }, []);

  const contextData = {
    providerId : id,

  };

  return (
    <ProviderContext.Provider value={contextData}>
      {props.children}
    </ProviderContext.Provider>
  );
}
