import react, { createContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getAllEmployments, getBranches, getProfile } from "../api/providerApi";
import { useQuery, useQueryClient  } from "@tanstack/react-query";
import { useGetBranches } from "../branches/api/useBranchDataApi";
import { useGetProvider, useGetProviderEmployments } from "../api/useProviderDataApi";
import { useGetStaffEmployments } from "../../staff/api/useStaffDataApi";
import useUserRoles from "../useUserRoles";
// import { redirect } from "react-router-dom";

export const ProviderContext = createContext();

export default function ProviderContextProvider(props) {
  const { id } = useParams();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
 
  // const {data:staffEmployments} = useGetStaffEmployments()

  // const current_user_roles = staffEmployments?.filter(emp=>{
  //   if(emp?.provider_id == id){
  //     return emp
  //      }
  //   }).map(emp=> emp?.employment_role)

  const user_perms = useUserRoles(id)

  
  const { status,isLoading:employmentListIsLoading, isError:employmentListIsError, error:employmentListError, data:listOfEmployments } = 
  useGetProviderEmployments(id)
  const { isLoading, isError, data:branches, error } = useGetBranches(id)
  const { isLoading:providerLoading, isError:providerError, data:profile } = useGetProvider(id)

  useEffect(() => {
    if(employmentListError?.response?.status === 403){
      queryClient.removeQueries({queryKey:["provider, employments-list"], exact:true})
      navigate("/ProviderNotAuthPage")
    }
    localStorage.setItem("provider", JSON.stringify(id));
  }, [employmentListError]);

  const contextData = {
    listOfEmployments: listOfEmployments,
    providerId: id,
    profile: profile,
    branches: branches,
    // current_user_roles:current_user_roles,
    user_perms:user_perms,
  };

  return (
    <ProviderContext.Provider value={contextData}>
      {props.children}
    </ProviderContext.Provider>
  );
}
