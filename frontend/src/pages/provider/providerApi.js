// import react, {useContext} from "react"
// import AuthContext from "../../context/AuthContext";
const APIENDPOINT = "http://127.0.0.1:8000";

// const { user, authTokens } = useContext(AuthContext);
let getProfile = async (provider_id) => {
  let response = await fetch(`${APIENDPOINT}/users/provider/${provider_id}/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.ok) {
    const data = response.json();
    return data;
  } else {
    throw "An error has happened";
  }
};

const createProvider = async (data, user_id) => {
  const response = await fetch(`${APIENDPOINT}/users/provider/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      owner: user_id,
      address: {
        unit_number: data.address.unit_number,
        first_line: data.address.first_line,
        second_line: data.address.second_line,
        city: data.address.city,
        governorate: data.address.governorate,
      },
      telephone: {
        telephone_number: data.telephone_numbers.telephone_number,
      },
    }),
  });
};

const createEmployment = async (staff_email, provider_id) => {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const response = await fetch(`${APIENDPOINT}/users/employment-create/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(token.access),
    },
    body: JSON.stringify({
      staff: staff_email,
      provider: provider_id,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return {
          msg: "successful_staff_has_been_registered",
          status: response.status,
        };
      }
      if (response.status === 500) {
        // need to add already registered message
        
        throw Error("This_staff_doesn't_exists,_plese_register_first");
      } else if (!response.ok) {
        throw Error("An_error_has_occured");
      }
    })
    .catch((err) => {
      return { msg: err.message };
    });

  return response;
};

export { getProfile, createEmployment, createProvider };
