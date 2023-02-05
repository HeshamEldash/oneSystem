import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllEmployments, getBranches, getProfile } from "../api/providerApi";
import { useQuery } from "@tanstack/react-query";
import { useGetBranches } from "../branches/api/useBranchDataApi";
import { useGetProvider } from "../api/useProviderDataApi";

export const ProviderContext = createContext();

export default function ProviderContextProvider(props) {
  const { id } = useParams();
  const [listOfEmployments, setListOfEmployments] = useState([]);
  // const [profile, setProfile] = useState({});



  const { isLoading, isError, data:branches, error } = useGetBranches(id)
  const { isLoading:providerLoading, isError:providerError, data:profile } = useGetProvider(id)





  const getEmployments = async () => {
    const employments = await getAllEmployments(id);
    setListOfEmployments(employments);
  };



  useEffect(() => {
    getEmployments();
    localStorage.setItem("provider", JSON.stringify(id));
  }, []);

  const contextData = {
    listOfEmployments: listOfEmployments,
    providerId: id,
    profile: profile,
    // setProfile: setProfile,
    branches: branches,

  };

  return (
    <ProviderContext.Provider value={contextData}>
      {props.children}
    </ProviderContext.Provider>
  );
}
