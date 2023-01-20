import APIENDPOINT from "../../utils/api_calls/apiEndpoint";

let token = JSON.parse(localStorage.getItem("authTokens"));



function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

let getStaffProfile = async (staff_id) => {
  let response = await fetch(
    `${APIENDPOINT}/users/employment-staff-list-api/`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
    }
  );

  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    throw "An error has happened";
  }
};

const updateStaffTelephoneList = async ({ staff_id, data }) => {
  return await fetch(
    `${APIENDPOINT}/users/staff-telephone-update-api/?` +
      new URLSearchParams({ staff_id: staff_id }),
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
      },
      body: JSON.stringify({
        telephone_numbers: data,
      }),
    }
  )
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export { getStaffProfile, updateStaffTelephoneList };
