import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Link,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProfile } from "./providerApi";
import { providerProfileSchema } from "./providerProfileSchema";
import { Address } from "../../components/Address";
import AddressUpdate from "../../components/ui/AddressUpdate";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const APIENDPOINT = "http://127.0.0.1:8000/";

function ProviderProfileUpdate() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  const [updatingAddress , setUpdatingAddress ] = useState({})

  const [open, setOpen] = React.useState(false);

  const handleOpen = (address) => {
    setUpdatingAddress(address)
    setOpen(true)};


  const handleClose = () => setOpen(false);

  const retreiveProfile = async () => {
    const profile = await getProfile(id);
    setProfile(profile);
    setAddresses(profile.address);
  };

  const onSubmit = async (values, actions) => {
    actions.resetForm();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      owner: "",
      date_created: "",
      address: "",
      telephone_numbers: "",
    },
    validationSchema: providerProfileSchema,
    onSubmit,
  });

  useEffect(() => {
    retreiveProfile();
  }, []);

  return (
    <>
      {updating ? (
        <>
          <form className="user-form" type="submit" onSubmit={handleSubmit}>
            <label> {t("provider-name")}</label>

            <input
              type="text"
              name="name"
              placeholder={t("enter_your_clinic_name")}
              className={
                errors.name && touched.name
                  ? "input-error form-fields"
                  : "form-fields"
              }
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        </>
      ) : (
        <>
          <div className="primary-container">
            <h1> {t("profile_information")}</h1>
            <h4>{t("name")}</h4>
            {profile?.name}
            <h4>{t("owner")}</h4>
            {profile?.owner_email}

            <h4>{t("date_create")}</h4>
            {profile?.date_created}

            <input
              type="button"
              className="secondry-button"
              value={t("update")}
              onClick={() => {
                setUpdating(true);
              }}
            />
          </div>
          <div className="primary-container">
          
            <h4>{t("address")}</h4>
            <input
              type="button"
              value="add_address"
              onClick={() => {
                setAddAddress((prev) => !prev);
              }}
            />
            {addAddress && <AddressUpdate />}
            
            {addresses.map((address) => {
              return (
                <>
                  <Address key={address.id} address={address} >
                  <input
                  
                    type="button"
                    className="secondry-button"
                    value={t("update")}
                    onClick={()=>handleOpen(address)}
                  />
                  </Address>
                </>
              )
            })}

            <Modal  
           
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                     <AddressUpdate address={updatingAddress} />

                
                  </Modal>
          </div>

          <div className="primary-container">
            <h4>{t("telephone_numbers")}</h4>
            {/* {profile?.telephone_numbers?.map((num) => {

              <h4>num</h4>;
            })} */}
          </div>
        </>
      )}
    </>
  );
}

export default ProviderProfileUpdate;
