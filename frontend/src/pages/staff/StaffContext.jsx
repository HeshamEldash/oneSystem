import react, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useGetOwnedProvider, useGetStaffEmployments, useGetStaffProfile } from "./api/useStaffDataApi";

export const StaffContext = createContext();

export default function StaffContextProvider(props) {
  const { user} = useContext(AuthContext);
  
  const [telephoneNumbers, setTelephoneNumbers] = useState([]);
  const { data:staffProfile}= useGetStaffProfile(user?.user_id)

  const {data:profiles} = useGetStaffEmployments(user?.user_id)

  const {data:ownedProvider} = useGetOwnedProvider(user?.user_id)

  useEffect(() => {   
    setTelephoneNumbers(staffProfile?.staff_profile.telephone_numbers)
  }, [staffProfile]);

  const contextData = {
    ownedProvider: ownedProvider,
    staffProfile: staffProfile,
    telephoneNumbers: telephoneNumbers,
    setTelephoneNumbers: setTelephoneNumbers,
    profiles:profiles,
    staffId:staffProfile?.staff_profile?.id
  };

  return (
    <StaffContext.Provider value={contextData}>
      {props.children}
    </StaffContext.Provider>
  );
}
