import React, { useState, useContext, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { ProviderContext } from "../../provider/context/ProviderContext";
import { useTranslation } from "react-i18next";
import { deleteClinic, postClinicData } from "../appointmentsApiCalls";
import { AppointmentContext } from "../AppointmentsContext";
import { ToastContainer, toast } from "react-toastify";
import ContextMenu from "../../../components/ContextMenu";
import ContextMenuItem from "../../../components/ContextMenuItem";

function ClinicCreate() {
  const { listOfEmployments, providerId } = useContext(ProviderContext);
  const { clinics, setClinics } = useContext(AppointmentContext);
  const { t } = useTranslation();
  const [selectedStaff, setSelectedStaff] = useState("");
  const specialityRef = useRef();
  const notify = () =>
    toast(t("clinic created succesfuly"), {
      toastId: "customId",
      className: "black-background",
      bodyClassName: "grow-font-size",
    });

  const handleChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  const handleDelete = (clinicId) =>{
    alert(t("Do yo really want to delete the clinic "))

    setClinics((prev)=>{
      return prev.filter((clinic)=>{
        return clinic.id != clinicId
      })
    })

    deleteClinic(clinicId)

  }
  const handleSubmit = async () => {
    const speciality = specialityRef.current.value;
    const clinicDetails = await postClinicData(
      providerId,
      selectedStaff,
      speciality
    );

    setClinics((prev) => [...prev, clinicDetails]);

    setSelectedStaff("");

    specialityRef.current.value = "";

    notify();
  };

  return (
    <div>
      <div className=" primary--page-box ">
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          style={{ width: "100%" }}
        />

        <h2 style={{ marginBottom: "2rem" }}>{t("create clinic")}</h2>
        <FormControl fullWidth>
          <InputLabel id="select-staff-label">{t("Staff")}</InputLabel>
          <Select
            labelId="select-staff-label"
            id="select-staff-select"
            value={selectedStaff}
            label="Staff"
            onChange={handleChange}
          >
            {listOfEmployments?.map((employment) => {
              if (employment.is_active)
                return (
                  <MenuItem value={employment.staff_id} key={employment.id}>
                    {employment.staff}
                  </MenuItem>
                );
            })}
          </Select>
          <label id="">{t("Speciality")}</label>

          <input type="text" className="form-fields" ref={specialityRef} />
        </FormControl>
        <input
          type="button"
          className="page_button page_button-width-medium page_button-width-medium-fixed"
          onClick={handleSubmit}
          value={t("create_clinic")}
          disabled={selectedStaff === "" && true}
        />
      </div>

      <div className=" primary--page-box ">
        <h2>{t("all clinics")}</h2>

        {clinics?.map((clinic) => {
          return (
            <>
            <div className="inner-page-box margin_bottom_small clinic" key={clinic.id} id={clinic.id}>
              <div>
                <span>Dr {clinic?.clinican_details?.first_name}</span>
                <span>{clinic?.clinican_details?.last_name}</span>
              </div>
              <span>{clinic.speciality}</span>
              
              <input type="button" className="secondry-button clinic_button" onClick={()=>handleDelete(clinic.id)} value={t("delete")}/>
            </div>

           </>
          );
        })}
      </div>
    </div>
  );
}

export default ClinicCreate;
