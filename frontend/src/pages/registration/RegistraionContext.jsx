// import { createContext, useState, useEffect } from "react";

// const RegistrationContext = createContext({});

// export default RegistrationContext

// export const RegistrationProvider = ({ children }) => {
//     const [email, setEmail] = useState("someemail")
//     const contextData = {
//         email: email,
//         password: "values.password",
//         staff_profile: {
//           first_name: "values.firstName",
//           middle_names: "values.middleNames",
//           last_name: "values.lastName",
//           professional_number : "values.professionalNumber",
//           telephone_numbers: [{
//             telephone_number: "values.telephoneNumber"
//           }],
//           staff_role:"DR"
//         }
//       }
   

//     return (
//         <RegistrationContext.Provider value={contextData}>
//         {children}
//         </RegistrationContext.Provider>
//     )
// }
