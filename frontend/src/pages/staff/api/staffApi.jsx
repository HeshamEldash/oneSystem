import axios from "axios";
import APIENDPOINT from "../../../api/apiEndpoint.jsx";

const getOwnedProvider = async ({user_id}) =>{
   const response = await axios.get( `${APIENDPOINT}/users/provider-detail-api/`, 
  {
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer " +
        String(JSON.parse(localStorage.getItem("authTokens"))?.access),
    },
    params:{ owner_id: user_id }
  }
  )
  return response.data 

}

let getStaffEmployments = async () => {

  
  const response = await axios.get(`${APIENDPOINT}/users/employment-staff-list-api/`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
    }
  );

  return response.data
    
};


const updateStaffTelephoneList = async ({ staff_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/staff-telephone-update-api/?` +
      new URLSearchParams({ staff_id: staff_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body: JSON.stringify({
        telephone_numbers: data,
      }),
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const getProfileDetails = async ({ user_id }) => {
  try {
    const response = await axios.get(
      `${APIENDPOINT}/users/staff-account-detail-api/?`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer " +
            String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        params: { account_id: user_id },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getStaffEmployments,
  updateStaffTelephoneList,
  getProfileDetails,
  getOwnedProvider,
};
