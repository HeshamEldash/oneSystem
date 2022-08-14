const APIENDPOINT = "http://127.0.0.1:8000";


const updateAddress = async (address_id, values) => {
    console.log(values)
    const response = await fetch(
      `${APIENDPOINT}/users/address-detail/${address_id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body:JSON.stringify({
            unit_number:values.unit_number,
            first_line:values.first_line,
            second_line:values.second_line,
            city:values.city,
            governorate:values.governorate,
        })
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
        },
      }
    );
  };

export {updateAddress, deleteAddress }