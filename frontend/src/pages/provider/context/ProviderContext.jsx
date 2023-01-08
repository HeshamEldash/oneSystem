import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllEmployments, getBranches, getProfile } from "../providerApi";
export const ProviderContext = createContext();

export default function ProviderContextProvider(props) {
  const { id } = useParams();
  const [listOfEmployments, setListOfEmployments] = useState([]);
  const [profile, setProfile] = useState({});
  const [branches, setBranches] = useState([])

  const retreiveBranches = async ()=>{
    const branches = await getBranches(id)
    setBranches(branches)
  }

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
    retreiveBranches()
    localStorage.setItem("provider", JSON.stringify(id))
  }, []);

  const contextData = {
    listOfEmployments : listOfEmployments,
    providerId: id,
    profile:profile,
    setProfile:setProfile,
    branches:branches,
    
  };

  return (
    <ProviderContext.Provider value={contextData}>
      {props.children}
    </ProviderContext.Provider>
  );
}
