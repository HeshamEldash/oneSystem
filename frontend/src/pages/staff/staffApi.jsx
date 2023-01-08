// staff-profile-detail/<int:pk>/

import APIENDPOINT from "../../utils/api_calls/apiEndpoint";

const token = JSON.parse(localStorage.getItem("authTokens"));

// const { user, authTokens } = useContext(AuthContext);
let getStaffProfile = async (staff_id) => {
  let response = await fetch(`${APIENDPOINT}/users/employment-staff-list-api/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(token.access),

    },
  });

  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    throw "An error has happened";
  }
};


export {getStaffProfile}