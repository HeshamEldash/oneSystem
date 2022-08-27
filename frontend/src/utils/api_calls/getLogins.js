import APIENDPOINT from "./apiEndpoint";

const getLastLogin = async (staff_id, provider_id) => {
    const response = await fetch(
      `${APIENDPOINT}/users/staff-login/${provider_id}/${staff_id}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return await data
  };

const getLogins = async (staff_id, provider_id) => {
    const response = await fetch(
      `${APIENDPOINT}/users/staff-logins-list/${provider_id}/${staff_id}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return await data
  };

const createLogin = async (staff_id, provider_id) => {
    const response = await fetch(
      `${APIENDPOINT}/users/staff-logins-list/${provider_id}/${staff_id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body:JSON.stringify({
            staff:staff_id,
            provider:provider_id
        })
      }
    );
  };

const endLogin = async (staff_id, provider_id) => {
    const response = await fetch(
      `${APIENDPOINT}/users/staff-logins/${provider_id}/${staff_id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        }
      }
    );
  
  };  
export {getLogins, createLogin, endLogin, getLastLogin }