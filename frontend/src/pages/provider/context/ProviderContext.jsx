import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { createLogin } from "../../../utils/api_calls/getLogins";
const ProviderContext = createContext();

function ProviderContextProvider(props) {

  const getProfileData = async () => {

  };

  

  useEffect(() => {
    createLogin()
  }, []);

  const contextData = {
 
  };

  return (
    <ProviderContext.Provider value={{ contextData }}>
      {props.children}
    </ProviderContext.Provider>
  );
}
