import { useDelete, useDirectMutation, useFlexMutation, useGet, usePost, useUpdate } from "../../../api/reactQuery";
import { getProfile, updateProviderProfile } from "./providerApi";


export const useGetProvider = (id)=>{
   return useGet(["provider"], getProfile, { provider_id: id })
}
export const useUpdateProvider = ()=>{
    return useUpdate(["provider"],updateProviderProfile )
}