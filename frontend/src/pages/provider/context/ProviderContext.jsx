import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllEmployments, getBranches, getProfile } from "../providerApi";
import { useQuery } from "@tanstack/react-query";
import { useGetBranches } from "../useBranchDataApi";

export const ProviderContext = createContext();

export default function ProviderContextProvider(props) {
  const { id } = useParams();
  const [listOfEmployments, setListOfEmployments] = useState([]);
  const [profile, setProfile] = useState({});
  // const [branches, setBranches] = useState([]);


  // const { isLoading, isError, data:branches, error } = useQuery({
  //   queryKey: ['branches', id],
  //   queryFn: () => getBranches(id),
  // })
  
  const { isLoading, isError, data:branches, error } = useGetBranches(id)

  // const retreiveBranches = async () => {
  //   const branches = await getBranches(id);
  //   setBranches(branches);
  // };



  const getEmployments = async () => {
    const employments = await getAllEmployments(id);
    setListOfEmployments(employments);
  };

  const retreiveProfile = async () => {
    const profile = await getProfile(id);
    setProfile(profile);
  };

  useEffect(() => {
    getEmployments();
    retreiveProfile();
    // retreiveBranches();
    localStorage.setItem("provider", JSON.stringify(id));
  }, []);

  const contextData = {
    listOfEmployments: listOfEmployments,
    providerId: id,
    profile: profile,
    setProfile: setProfile,
    branches: branches,
    // setBranches:setBranches,
  };

  return (
    <ProviderContext.Provider value={contextData}>
      {props.children}
    </ProviderContext.Provider>
  );
}
