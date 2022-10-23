import React, { useRef, useState } from "react";
import "./medications.css";
function Testings() {
  const inputRef = useRef(null);
    const [drugList, setDrugList] = useState([])
  const getRxuci = async (srtingName) => {
    let response = await fetch(
      "https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?" +
        new URLSearchParams({ name: srtingName }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response.json();
    }
  };

  const getRxConceptProperties = async (rcuxi) => {
    let response = await fetch(
      `https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui/${rcuxi}/properties.json?` +
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
       return response.json();
    }
  };

  const getDrugs = async (srtingName) => {
    let response = await fetch(
      "https://rxnav.nlm.nih.gov/REST/Prescribe/drugs.json?" +
        new URLSearchParams({ name: srtingName }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response.json();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const drugString = inputRef.current.value;
    const rxuciData = await getRxuci(drugString);
    const rcuxi = rxuciData.idGroup.rxnormId[0];

    const propertiesDetails = await getRxConceptProperties(rcuxi)
    const properties = propertiesDetails.properties


    const drugData= await getDrugs(properties.name)
    console.log(drugData.drugGroup.conceptGroup)
    setDrugList(drugData.drugGroup.conceptGroup)





  };

  return (
    <div className="testmedicince ">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
        />
        <input type="submit" />
      </form>
      {
        drugList.map((item)=>{
            return item?.conceptProperties?.map((drug)=>{
                return <h1>{drug.name}</h1>
            })
        })
      }


    </div>
  );
}

export default Testings;
