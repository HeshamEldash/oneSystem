import APIENDPOINT from "./apiEndpoint";

const token = JSON.parse(localStorage.getItem("authTokens"));

const createAddress = async (owner_id, values, owner_type) => {
  const response = await fetch(
    `${APIENDPOINT}/users/address-list/${owner_type}/${owner_id}/`,
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        unit_number: values.unit_number,
        first_line: values.first_line,
        second_line: values.second_line,
        city: values.city,
        governorate: values.governorate,
        // provider: provider_id,
      }),
    }
  );
};

const updateAddress = async (address_id, values) => {
  const response = await fetch(
    `${APIENDPOINT}/users/address-detail/${address_id}/`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({
        unit_number: values.unit_number,
        first_line: values.first_line,
        second_line: values.second_line,
        city: values.city,
        governorate: values.governorate,
      }),
    }
  );
};

const deleteAddress = async (address_id) => {
  const response = await fetch(
    `${APIENDPOINT}/users/address-detail/${address_id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );
};

const getAddress = async (address_id) => {
  const response = await fetch(
    `${APIENDPOINT}/users/address-detail/${address_id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    }
  );
};

export { createAddress, updateAddress, deleteAddress };
