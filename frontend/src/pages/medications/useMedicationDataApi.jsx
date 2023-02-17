import {useConfigQuery,useDelete,useDirectMutation,useFlexMutation,useGet,usePost,useUpdate,} from "../../api/reactQuery";
import { getPrescriptionList, getRegularMedications } from "./medicationsApiCalls";


export const useGetAllPrescriptions = (patient_id)=>{
    return useGet(["patient","all_prescriptions"], getPrescriptionList, {patient_id:patient_id})

} 
export const useGetRegularMedicationsData = (patient_id)=>{
    return useGet(["patient","regular_medications"], getRegularMedications, {patient_id:patient_id})

} 

