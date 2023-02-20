import React, { useState, useContext, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { ProviderContext } from "../../provider/context/ProviderContext";
import { useTranslation } from "react-i18next";
import { AppointmentContext } from "../AppointmentsContext";
import { ToastContainer, toast } from "react-toastify";
import { useCreateClinic, useDeleteClinic } from "../api/useAppointmentDataApi";

function ClinicCreate() {
  const { listOfEmployments, providerId, branches } =
    useContext(ProviderContext);
  const { clinics, setClinics } = useContext(AppointmentContext);
  const { t } = useTranslation();
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const { mutate: deleteClinic } = useDeleteClinic();

  const { mutate: createClinic, isSuccess, isError } = useCreateClinic();

  const specialityRef = useRef();
  const notify = () =>
    toast(t("clinic created succesfuly"), {
      toastId: "customId",
      className: "black-background",
      bodyClassName: "grow-font-size",
    });

  const handleChange = (e) => {
    if (e.target.name === "staff") {
      setSelectedStaff(e.target.value);
    }
    if (e.target.name === "branch") {
      setSelectedBranch(e.target.value);
    }
  };

  const handleDelete = (clinicId) => {
    alert(t("Do yo really want to delete the clinic "));

    deleteClinic(clinicId);
  };

  const handleSubmit = async () => {
    const speciality = specialityRef.current.value;

    createClinic(
      {
        providerId,
        selectedBranch,
        selectedStaff,
        speciality,
      },
      {
        onSuccess: () => {
          notify();
          setSelectedStaff("");
          setSelectedBranch("");
          specialityRef.current.value = "";
        },
        onError: (error)=>{
          notify("an error has occured")
        }
      }
    );
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
          <InputLabel id="branch-label">{t("Branch")}</InputLabel>
          <Select
            labelId="branch-label"
            id="branch-select"
            value={selectedBranch}
            label="Branch"
            name="branch"
            onChange={handleChange}
          >
            {branches?.map((branch) => {
              return (
                <MenuItem value={branch.id} key={branch.id}>
                  {branch.branch_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <FormControl fullWidth>
          <InputLabel id="select-staff-label">{t("Staff")}</InputLabel>
          <Select
            labelId="select-staff-label"
            id="select-staff-select"
            value={selectedStaff}
            label="Staff"
            onChange={handleChange}
            name="staff"
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

        {clinics?.map((clinic, index) => {
          return (
            <div
              className="inner-page-box margin_bottom_small clinic"
              key={clinic.id ? clinic.id : index + clinic.speciality}
              id={clinic.id}
            >
              <div>
                <span>Dr {clinic?.clinican_details?.first_name}</span>
                <span>{clinic?.clinican_details?.last_name}</span>
              </div>
              <span>{clinic.branch}</span>

              <span>{clinic.speciality}</span>

              <input
                type="button"
                className="secondry-button clinic_button"
                onClick={() => handleDelete(clinic.id)}
                value={t("delete")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClinicCreate;
