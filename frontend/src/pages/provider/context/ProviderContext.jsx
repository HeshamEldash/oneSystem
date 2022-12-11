import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllEmployments, getProfile } from "../providerApi";
export const ProviderContext = createContext();

export default function ProviderContextProvider(props) {
  const { id } = useParams();
  const [listOfEmployments, setListOfEmployments] = useState([]);
  const [profile, setProfile] = useState({});


  const getEmployments = async () => {
    const employments = await getAllEmployments(id);
    setListOfEmployments(employments);
  };
  
  const retreiveProfile = async () => {
    const profile = await getProfile(id);
    setProfile(profile);
    // setAddresses(profile.address);
    // setTelephones(profile.telephone_numbers);
  }; 

  useEffect(() => {
    getEmployments()
    retreiveProfile()
    localStorage.setItem("provider", JSON.stringify(id))
  }, []);

  const contextData = {
    listOfEmployments : listOfEmployments,
    providerId: id,
    profile:profile,
    setProfile:setProfile,
    
  };

  return (
    <ProviderContext.Provider value={contextData}>
      {props.children}
    </ProviderContext.Provider>
  );
}
