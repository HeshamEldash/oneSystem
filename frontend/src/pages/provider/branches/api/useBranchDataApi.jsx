import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createBranch, deleteBranch, getBranches, updateBranchAddress } from "../../api/providerApi";
import {usePost, useDelete, useGet, useUpdate } from "../../../../api/reactQuery"


/*
    From top to Bottom:
        For Post:
            1- In the client (context / component), create an instance of the constume hook 
            2- call the Mutate function and pass the values required to Update
                - these values get passed to the useMutate.mutate function without us getting involved 
            3- Inside the costume hook, call the usePost function which takes 
                a- the updatefunction --> "the old api functions"
                b- the queryKey --> an Array that tells the react-query which query to update
            4- The usePost Functions: This is where the queryClient is called and the useMutation hook is called 


*/

export const useDeleteBranch = () => {
  return useDelete(deleteBranch, ["branches"]);
};

export const usePostBranch = () => {
  return usePost(createBranch, ["branches"]);
};

export const useGetBranches = (id) => {
  return useGet(["branches"], getBranches, { provider_id: id });
};


export const useUpdateBranchAddress = (id)=>{
 return useUpdate(["branches", id] , updateBranchAddress)
}