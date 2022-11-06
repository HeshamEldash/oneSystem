import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./medications.css";
import Medicine from "./Medicine";
import Switch from "@mui/material/Switch";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RepeatIcon from "@mui/icons-material/Repeat";
import QueueIcon from "@mui/icons-material/Queue";
import LayersIcon from "@mui/icons-material/Layers";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import { createPrescription } from "./medicationsApiCalls";
import { useRecordContext } from "../records/context/RecordContextHook";
import { ProviderContext } from "../provider/context/ProviderContext";
import MedicationPresetPanel from "./MedicationPresetPanel";

function MedicationPrescribePanel({showMedicationPanel, setParent}) {

  const {contextPrescribedList, setContextPrescribedList}=useRecordContext()
  const [drugList, setDrugList] = useState([]);
  const [terms, setTerms] = useState([]);
  const [options, setOptions] = useState([]);
  const [storedRcuxi, setStoredRcuxi] = useState();
  const [interactions, setInteractions] = useState([]);
  const [value, setValue] = React.useState(options[0]);
  const [selectedMedicine, setSelectedMedicine] = useState();
  const [apiPx, setApiPx] = useState(true);
  const { patient, patientId } = useRecordContext();
  const { providerId } = useContext(ProviderContext);
  const doseRef = useRef();
  const freeTextMedicineRef = useRef();
  const [prescribedList, setPrescribedList] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isRegular, setIsRegular] = useState(false)
  const [showPresetPanel, setShowPresetPanel]= useState(false)
  const [prescription, setPrescription] = useState({
    // name: "",
    // rxcui: "",
    // synonym: "",
    // dose: "",
    // is_regular: false,
  });
  const fabStyle ={ width: 30, height: 30, borderRadius: 1 , zIndex:0 }

  const showInteractions = async () => {
    let response = await fetch(
      "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?" +
        new URLSearchParams({ rxcui: storedRcuxi }),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const info =
          data.interactionTypeGroup[0].interactionType[0].interactionPair;
        setInteractions(info);
      });
  };

  const displaynames = async () => {
    // Call to the API to get the list of terms
    let response = await fetch(
      `https://rxnav.nlm.nih.gov/REST/Prescribe/displaynames.json?` +
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

  const displayTerms = useMemo(async () => {
    // a memo funtion to set displayTerms only once
    const terms = await displaynames();
    const termList = terms?.displayTermsList?.term;
    return termList;
  }, []);

  const getTerms = async () => {
    // a function to be called in useEffect to set the terms list
    const terms = await displayTerms;
    setTerms(terms);
  };

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

  const handleChange = async (e) => {
    const search = e.target.value;
    if (search.length > 3) {
      setOptions((prev) => {
        return terms.filter((term) => {
          return term.startsWith(search);
        });
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const drugString = inputRef.current.value;
    const drugString = value;

    const rxuciData = await getRxuci(drugString);
    const rcuxi = rxuciData.idGroup.rxnormId[0];
    setStoredRcuxi(rcuxi);

    const propertiesDetails = await getRxConceptProperties(rcuxi);
    const properties = propertiesDetails.properties;

    const drugData = await getDrugs(properties.name);
    setDrugList(drugData.drugGroup.conceptGroup);
  };

  useEffect(() => {
    getTerms();
  }, []);

  const handleMedicineSelect = (drug) => {
    setSelectedMedicine(drug);
  };

  const handleClearPanel = () => {
    if (freeTextMedicineRef.current != null) {
      freeTextMedicineRef.current.value = "";
    }
    if (doseRef.current != null) {
      doseRef.current.value = "";
    }
    setStoredRcuxi();
    setValue();
    setDrugList([]);
    setOptions([]);
    setInputValue("");
    setInteractions([]);
    setSelectedMedicine();
    setPrescription()
    setIsRegular(false)
  };

  const prescribeCurrentMedication = () => {
    let prescriptionInit = {};

    if (apiPx) {
      if (!selectedMedicine) {
        return null;
      }
      if (doseRef.current.value === "") {
        alert("you cannot leave the dose box empty");
        return null;
      }

      prescriptionInit = {
        name: selectedMedicine.name,
        rxcui: selectedMedicine.rcuxi,
        // synonym: selectedMedicine.synonym,
        dose: doseRef.current.value,
        is_regular: isRegular,
      };
      setPrescription(prescriptionInit);
    } else {
      if (freeTextMedicineRef.current.value === "") {
        alert("you cannot leave the medication box empty");
        return null;
      }
      if (doseRef.current.value === "") {
        alert("you cannot leave the dose box empty");
        return null;
      }

      prescriptionInit = {
        name: freeTextMedicineRef.current.value,
        rxcui: "",
        // synonym: "",
        dose: doseRef.current.value,
        is_regular: isRegular,
      };
      setPrescription(prescriptionInit);
    }

    return prescriptionInit;
  };

  const handleAddMedication = () => {
    let currentPx = prescribeCurrentMedication();
    if (currentPx === null) {
      return;
    }
    setPrescribedList((prev) => [...prev, currentPx]);

    handleClearPanel();
  };

  const handlePresciption = () => {
    let currentPx = prescribeCurrentMedication();

    // // handle sending data to backend
    let prescriptionData = [];


    if (currentPx === null) { 


      if (apiPx && prescribedList.length > 0 ){
        prescriptionData = [...prescribedList]
      }else{
        return 
      } 

    }else{
      prescriptionData = [
        ...prescribedList,
        currentPx
      ];
    }

    createPrescription(patientId, providerId, prescriptionData);
    setParent(prescriptionData)

    // clear the panel
    setPrescribedList([])
    handleClearPanel();
  };



  useEffect(()=>{
    if (contextPrescribedList.length > 0){
      setPrescribedList(contextPrescribedList)
    }
  },[])

  useEffect(()=>{
    setContextPrescribedList(prescribedList)
  },[prescribedList])

  return (
    <div className="medication_px_panel " style={{display:showMedicationPanel ?"block":"none" }}>
      free Text
      <Switch
        checked={apiPx}
        onChange={(e) => {
          setApiPx(e.target.checked);
        }}
      />
      Computer prescription
      <br />
      <br />
      {apiPx ? (
        <div>
          <div className="search_box">
            <form className="search_box__form" onSubmit={handleSubmit}>
              <Autocomplete
                value={value}
                inputValue={inputValue}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  // setInputValue(newValue)
                }}
                freeSolo
                options={options}
                onInputChange={(event, newInputValue) => {
                  setValue(newInputValue);
                  setInputValue(newInputValue);
                  handleChange(event);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Medication"
                      // onChange={handleChange}
                    />
                  );
                }}
                sx={{
                  bgcolor: "white",
                  width: 0.8,
                  display: "inline-block",
                  minWidth: 300,
                }}
                size="small"
              />

              <input
                className="record_entry__button border_radius_5 shallow_shadow"
                type="submit"
                value={"Search"}
              />
            </form>
          </div>

          {selectedMedicine && (
            <div>
              <label className="prescribtion_label">
                Medication:
                <Medicine drug={selectedMedicine} selected={true} />
              </label>

              <label className="prescribtion_label">
                Dose:
                <input
                  className="record_entry__input"
                  type="text"
                  ref={doseRef}
                />
              </label>
            </div>
          )}

          <div className="medications_results">
            <div className="inner-page-box padding1 medications_results_box">
              <h2>Medications</h2>
              {drugList.map((item) => {
                return item?.conceptProperties?.map((drug, index) => {
                  return (
                    <Medicine
                      key={index}
                      drug={drug}
                      selectMedicine={handleMedicineSelect}
                    />
                  );
                });
              })}
            </div>

            <div className="inner-page-box padding1 medications_results_box">
              <div className="flex-row space_between align-items-center">
                <h2>Interactions</h2>
                <button
                  className="record_entry__button border_radius_5 shallow_shadow"
                  onClick={showInteractions}
                  disabled={!storedRcuxi && true}
                >
                  Show Interactions
                </button>
              </div>

              {interactions?.map((interaction, index) => {
                return (
                  <div
                    key={index}
                    className="light_border_bottom shallow_shadow"
                  >
                    <p className="font_weight_bold">
                      {interaction.interactionConcept[1].sourceConceptItem.name}
                    </p>
                    <p>{interaction.description}</p>
                    <p>{interaction.severity}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="prescribtion_label">
            Medicine:
            <input
              className="record_entry__input precription_label"
              type="text"
              ref={freeTextMedicineRef}
            />
          </label>

          <label className="prescribtion_label">
            Dose:
            <input className="record_entry__input" type="text" ref={doseRef} />
          </label>
        </div>
      )}

      { showPresetPanel && <MedicationPresetPanel
              setPrescribedList={setPrescribedList}
              isRegular= {isRegular}

      />}

      <div className="prescription__footer">
        <div className="prescribed_list">
    
        {prescribedList.map((medication, index)=>{
          return <div>
          <span className="medName" key={index}>{medication.name} </span>
          <span className="closeBox">
          <ClearIcon 
          sx={{width:20, position:"relative", cursor:"pointer", height:"auto", position:"absolute"}}
            onClick={()=>{
              setPrescribedList(()=>
              prescribedList.filter((med, medIndex)=>{
                return index != medIndex
              })
              )
            }}
          />
          </span>
          
          </div>
        })}
        </div>


    
        <div className="prescription__actions">
          <Tooltip title="Add Another Drug">
            <Fab
              color="primary"
              aria-label="add"
              sx={fabStyle}
              onClick={() => handleAddMedication()}
            >
              <AddIcon />
            </Fab>
          </Tooltip>

          <Tooltip title= {isRegular? "Regular" : "Make Regular"} >
            <Fab
              color={isRegular? "secondary" : "primary"}
              aria-label="add"
              sx={fabStyle}
              onClick={()=>setIsRegular((prev)=>!prev)}
            >
              <RepeatIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Add To User Presets">
            <Fab
              color="primary"
              aria-label="add"
              sx={fabStyle}
            >
              <QueueIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Select From User Presets">
            <Fab
              color={showPresetPanel? "secondary" : "primary"}
              aria-label="add"
              sx={fabStyle}
              onClick={()=>setShowPresetPanel((prev)=>!prev)}
            >
              <LayersIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Clear the panel">
            <Fab
              color="primary"
              aria-label="add"
              sx={fabStyle}
              onClick={() => handleClearPanel()}
            >
              <ClearIcon />
            </Fab>
          </Tooltip>


        </div>

        <button
          className="record_entry__button border_radius_5 shallow_shadow"
          onClick={() => handlePresciption()}
          // disabled={!selectedMedicine & !freeTextMedicineRef.current?.value === "" }
        >
          Prescribe
        </button>
      </div>
    </div>
  );
}

export default MedicationPrescribePanel;
