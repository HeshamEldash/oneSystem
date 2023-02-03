import APIENDPOINT from "./apiEndpoint";
const token = JSON.parse(localStorage.getItem("authTokens"));

const deletePhoneNumber = async (phone_id) => {
    const response = await fetch(
      `${APIENDPOINT}/users/telephone-number-detail/${phone_id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
      }
    );
  };

  const updatePhoneNumber = async (phone_id, phone_num) => {
    const response = await fetch(
      `${APIENDPOINT}/users/telephone-number-detail/${phone_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        body: JSON.stringify({
          telephone_number: phone_num
        })
      }
    );
  };



  export {deletePhoneNumber, updatePhoneNumber}