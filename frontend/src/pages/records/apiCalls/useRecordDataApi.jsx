import {useConfigQuery,useDelete,useDirectMutation,useFlexMutation,useGet,usePost,useUpdate,} from "../../../api/reactQuery";
import {getPatientProfile,getPatientRecords,createRecord,updateRecord,updatePatinetProfile,createPastCodition,getPastCoditions,deletePastCodition,getRecordFiles,getIcdList,} from "./recordsApiCalls";






export const useGetPatinetProfile = (patient_id)=>{
    return useGet(["patient", "profile"], getPatientProfile, {patient_id:patient_id})
} 

export const useGetRecordsData = (patient_id)=>{
    return useGet(["patient","records"], getPatientRecords, {patient_id:patient_id})
} 




// export const useGetPatinetProfile = ()=>{} 
// export const useGetPatinetProfile = ()=>{} 
// export const useGetPatinetProfile = ()=>{} 
// export const useGetPatinetProfile = ()=>{} 