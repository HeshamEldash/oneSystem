import { useConfigQuery, useDelete, useDirectMutation, useFlexMutation, useGet, usePost, useUpdate } from "../../../api/reactQuery";
import { getAllEmployments, getProfile, updateProviderProfile } from "./providerApi";


export const useGetProvider = (id)=>{
   return useGet(["provider"], getProfile, { provider_id: id })
}
export const useUpdateProvider = ()=>{
    return useUpdate(["provider"],updateProviderProfile )
}


export const useGetProviderEmployments = (id)=>{
    return useConfigQuery(["provider, employments-list"], getAllEmployments, { provider_id: id }, {
        retry:(failureCount, error) => {
           if (error.response.status === 403) {
            return 0
           }
           else{
            return 3
           }
        }
    })
 }
