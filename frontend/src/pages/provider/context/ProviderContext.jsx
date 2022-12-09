import react, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllEmployments } from "../providerApi";
export const ProviderContext = createContext();

export default function ProviderContextProvider(props) {
  const { id } = useParams();
  const [listOfEmployments, setListOfEmployments] = useState([]);

  const getEmployments = async () => {
    const employments = await getAllEmployments(id);
    setListOfEmployments(employments);

  };
  


  useEffect(() => {
    getEmployments()
    localStorage.setItem("provider", JSON.stringify(id))
  }, []);

  const contextData = {
    listOfEmployments : listOfEmployments,
    providerId: id
  };

  return (
    <ProviderContext.Provider value={contextData}>
      {props.children}
    </ProviderContext.Provider>
  );
}
