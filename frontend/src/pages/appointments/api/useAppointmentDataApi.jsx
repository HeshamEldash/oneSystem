import {
  useFlexDelete,
  useFlexMutation,
  useGet,
} from "../../../api/reactQuery";
import {
  bookAppointment,
  deleteClinic,
  getClinicData,
  postClinicData,
} from "../appointmentsApiCalls.jsx";

export const useGetClinicData = (provider_id) => {
  return useGet(["clinics"], getClinicData, { provider_id: provider_id });
};

export const useDeleteClinic = () => {
  const filterFunction = (prevData, clinicId) => {
    return prevData.filter((clinic) => {
      return clinic.id != clinicId;
    });
  };
  return useFlexDelete(deleteClinic, ["clinics"], filterFunction);
};

export const useCreateClinic = () => {
  const addFunc = (prevData, newData) => {
    return [...prevData, newData];
  };
  return useFlexMutation(["clinics"], postClinicData, addFunc, true);
};
