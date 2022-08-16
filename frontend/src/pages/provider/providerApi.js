const APIENDPOINT = "http://127.0.0.1:8000";


let getProfile = async (provider_id) => {
    let response = await fetch(`${APIENDPOINT}/users/provider/${provider_id}/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
        const data = response.json()
        return data
    } else{
        throw "An error has happened"
    }
  };


  const createProvider = async(data,user_id)=>{

      const response = await fetch(`${APIENDPOINT}/users/provider/`,{
        method: "POST",
        headers:{
        "Content-type": "application/json",
        },
        body: JSON.stringify(
          {
            name:data.name,
            owner:user_id,
            address: {
              unit_number: data.address.unit_number,
              first_line: data.address.first_line,
              second_line: data.address.second_line,
              city: data.address.city,
              governorate: data.address.governorate,
            },
            telephone: {
              telephone_number: data.telephone_numbers.telephone_number
            },
          }
        )
      }
     
      )
  }


export {getProfile,createProvider}  