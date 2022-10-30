import React, { useEffect, useMemo, useRef, useState } from "react";
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

function MedicationPrescribePanel() {
  const [drugList, setDrugList] = useState([]);
  const [terms, setTerms] = useState([]);
  const [options, setOptions] = useState([]);
  const [storedRcuxi, setStoredRcuxi] = useState();
  const [interactions, setInteractions] = useState([]);
  const [value, setValue] = React.useState(options[0]);
  const [selectedMedicine, setSelectedMedicine] = useState();
  const [apiPx, setApiPx] = useState(true);

  const [prescription, setPrescription] = useState({
    name: "",
    rxcui: "",
    synonym: "",
    dose: "",
  });

  const doseRef = useRef();
  const freeTextMedicineRef = useRef();

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

  const handlePresciption = () => {
    if (apiPx) {
      setPrescription({
        name: selectedMedicine.name,
        rxcui: selectedMedicine.rcuxi,
        synonym: selectedMedicine.synonym,
        dose: doseRef.current.value,
      });
    } else {
      setPrescription({
        name: freeTextMedicineRef.current.value,
        rxcui: "",
        synonym: "",
        dose: doseRef.current.value,
      });
    }
  };

  return (
    <div className="medication_px_panel ">
      free Text
      <Switch
        checked={apiPx}
        onChange={(e) => {
          setApiPx(e.target.checked);
        }}
      />
      Computer prescription
      {apiPx ? (
        <div>
          <div className="search_box">
            <form className="search_box__form" onSubmit={handleSubmit}>
              <Autocomplete
                // id="free-solo-demo"

                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                freeSolo
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Medication"
                    onChange={handleChange}
                  />
                )}
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
      <div className="prescription__footer">
        <div className="prescription__actions">
          <Tooltip title="Add Another Drug">
            <Fab
              color="primary"
              aria-label="add"
              sx={{ width: 30, height: 30, borderRadius: 1 }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Make Repeat">
            <Fab
              color="primary"
              aria-label="add"
              sx={{ width: 30, height: 30, borderRadius: 1 }}
            >
              <RepeatIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Add To User Presets">
            <Fab
              color="primary"
              aria-label="add"
              sx={{ width: 30, height: 30, borderRadius: 1 }}
            >
              <QueueIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="Select From User Presets">
            <Fab
              color="primary"
              aria-label="add"
              sx={{ width: 30, height: 30, borderRadius: 1 }}
            >
              <LayersIcon />
            </Fab>
          </Tooltip>

          {/* make preset  */}
          {/* make repeat  */}
          {/* add another */}
          {/* choose from presets */}
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
