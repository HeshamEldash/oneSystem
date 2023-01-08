import react, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";
const token = JSON.parse(localStorage.getItem("authTokens"));

export const StaffContext = createContext();

export default function StaffContextProvider(props) {
  
    const { user } = useContext(AuthContext);
    const [ownedProvider, setOwnedProvider] = useState();
    const [staffProfile, setStaffProfile] = useState();
    const [telephoneNumbers, setTelephoneNumbers] = useState([]);

    const getOwnedProvider = async () => {
        const response = await fetch(
          `${APIENDPOINT}/users/provider-detail-api/?` +
            new URLSearchParams({ owner_id: user.user_id }),
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
             Authorization: "Bearer " + String(token.access),

            },
          }
        );
    
        if (response.ok) {
          const data = await response.json();
          setOwnedProvider(data);
        }
      };




      const getProfileDetails = async () => {
        const response = await fetch(
          `${APIENDPOINT}/users/staff-account-detail-api/?` +
          new URLSearchParams({ account_id: user.user_id }),
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
               Authorization: "Bearer " + String(token.access),

            },
          }
        );
    
        if (response.ok) {
          const data = await response.json();
          setStaffProfile(data);
          setTelephoneNumbers(data.staff_profile.telephone_numbers);
        }
      };


    useEffect(() => {
        getOwnedProvider();
        getProfileDetails();
      }, []);
  const contextData = {
    ownedProvider:ownedProvider,
    staffProfile:staffProfile,
    telephoneNumbers:telephoneNumbers,
    setTelephoneNumbers:setTelephoneNumbers
  };

  return (
    <StaffContext.Provider value={contextData}>
      {props.children}
    </StaffContext.Provider>
  );
}