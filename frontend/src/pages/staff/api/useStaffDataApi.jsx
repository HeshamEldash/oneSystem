import { useConfigQuery, useDelete, useGet, useUpdate } from "../../../api/reactQuery";
import { getOwnedProvider, getProfileDetails, getStaffEmployments } from "./staffApi";




export const useGetStaffProfile = (user_id, config={})=>{
    return useConfigQuery(["staff", "profile"],getProfileDetails, {user_id:user_id}, config)
}

export const useGetStaffEmployments = () =>{
    return useGet(["staff", "employments"],getStaffEmployments)
}

export const useGetOwnedProvider = (user_id)=>{
    return useConfigQuery(["staff", "ownedProvider"],getOwnedProvider, {user_id:user_id}, {
        retry:0,
        
    })
    
}

