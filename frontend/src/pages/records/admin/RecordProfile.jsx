import React, { useEffect, useState, useRef } from "react";
import { useRecordContext } from "../context/RecordContextHook";
import { useTranslation } from "react-i18next";
import AddressUpdate from "../../../components/ui/AddressUpdate";
import PatientProfileUpdateComponent from "../../patients/components/PatientProfileUpdateComponent";
import TelephoneUpdate from "../../../components/ui/TelephoneUpdate";

function RecordProfile() {
  const { t } = useTranslation();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updateTelephone, setUpdateTelephone] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  const { patient } = useRecordContext();
  const addressFormSubmitRef = useRef();
  const [displayedAddress, setDisplayedAddress] = useState();

  const [displayedProfile, setDisplayedProfile] = useState();
  const [patientProfile, setPatientProfile] = useState({});
  const profileFormSubmitRef = useRef();
  const [displayedPhones, setDsiplayedPhones] = useState();
  useEffect(() => {
    setPatientProfile({
      id: patient.id,
      first_name: patient?.first_name,
      middle_names: patient.middle_names,
      last_name: patient.last_name,
      date_of_birth: patient.date_of_birth,
      gender: patient.gender,
    });
    setDsiplayedPhones(patient.telephone_numbers);
  }, [patient]);

  return (
    <div className="page-component-main--grid page-component-main--grid--small">
      <h1 className="page_component__inpage--spanAll">Patient_profile</h1>

      <div className="page_component__inpage--spanAll">
        <h2>Profile</h2>
        <div className="inpage-container_record">
          {updateProfile ? (
            <PatientProfileUpdateComponent
              profileId={patient.id}
              profile={displayedProfile ? displayedProfile : patientProfile}
              profileFormSubmitRef={profileFormSubmitRef}
              updateParent={(values) => setDisplayedProfile(values)}
            />
          ) : (
            <>
              <div className="input_component">
                <label className="label"> {t("first_name")}:</label>
                <span>
                  {displayedProfile?.first_name
                    ? displayedProfile?.first_name
                    : patient.first_name}
                </span>
              </div>

              <div className="input_component">
                <label className="label"> {t("middle_names")}:</label>
                <span>
                  {displayedProfile?.middle_names
                    ? displayedProfile?.middle_names
                    : patient.middle_names}
                </span>
              </div>

              <div className="input_component">
                <label className="label"> {t("last_name")}:</label>
                <span>
                  {displayedProfile?.last_name
                    ? displayedProfile?.last_name
                    : patient.last_name}
                </span>
              </div>

              <div className="input_component">
                <label className="label"> {t("date_of_birth")}:</label>
                <span>
                  {displayedProfile?.date_of_birth
                    ? displayedProfile?.date_of_birth
                    : patient.date_of_birth}
                </span>
              </div>

              <div className="input_component">
                <label className="label"> {t("gender")}:</label>
                <span>
                  {displayedProfile?.gender
                    ? displayedProfile?.gender
                    : patient.gender}
                </span>
              </div>
            </>
          )}

          <div className="inpage-container_record__buttons">
            {!updateProfile ? (
              <input
                className="b3 "
                type="button"
                value={"update"}
                onClick={() => setUpdateProfile(true)}
              />
            ) : (
              <>
                <input
                  className="b3 "
                  type="button"
                  value={"submit"}
                  onClick={() => {
                    profileFormSubmitRef.current.click();
                    setUpdateProfile((prev) => !prev);
                  }}
                />
                <input
                  className="b3 r"
                  type="button"
                  value={"discard"}
                  onClick={() => setUpdateProfile((prev) => !prev)}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="page_component__inpage--spanAll">
        <h2> {t("address")}</h2>
        <div className="inpage-container_record inpage-container_record--just_left">
          {!updateAddress ? (
            <div>
              <span className="large_font">
                {displayedAddress?.unit_number
                  ? displayedAddress.unit_number
                  : patient?.address?.unit_number}{" "}
              </span>
              <br />
              <span className="large_font">
                {" "}
                {displayedAddress?.first_line
                  ? displayedAddress.first_line
                  : patient?.address?.first_line}{" "}
              </span>
              <br />
              <span className="large_font">
                {" "}
                {displayedAddress?.second_line
                  ? displayedAddress.second_line
                  : patient?.address?.second_line}{" "}
              </span>
              <br />
              <span className="large_font">
                {displayedAddress?.city
                  ? displayedAddress.city
                  : patient?.address?.city}{" "}
              </span>
              <br />
              <span className="large_font">
                {displayedAddress?.governorate
                  ? displayedAddress.governorate
                  : patient?.address?.governorate}{" "}
              </span>
            </div>
          ) : (
            <>
              <AddressUpdate
                addressId={patient?.address?.id}
                address={displayedAddress ? displayedAddress : patient?.address}
                addressFormSubmitRef={addressFormSubmitRef}
                updateParent={(values) => setDisplayedAddress(values)}
              />
            </>
          )}

          <div className="inpage-container_record__buttons">
            {!updateAddress ? (
              <input
                className="b3 "
                type="button"
                value={"update"}
                onClick={() => setUpdateAddress(true)}
              />
            ) : (
              <>
                <input
                  className="b3 "
                  type="button"
                  value={t("submit")}
                  onClick={() => {
                    addressFormSubmitRef.current.click();
                    setUpdateAddress((prev) => !prev);
                  }}
                />
                <input
                  className="b3 r"
                  type="button"
                  value={"discard"}
                  onClick={() => setUpdateAddress((prev) => !prev)}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="page_component__inpage--spanAll ">
        <h2>{t("telephone_numbers")}</h2>
        <div className="inpage-container_record">

          {displayedPhones?.map((telephone, index) => {
            return (
              <div key={telephone.id} className="input_component">
                <TelephoneUpdate
                  telephone_number={telephone.telephone_number}
                  telephone_id={telephone.id}
                  controlParent={setDsiplayedPhones}
                  showButtons = {updateTelephone? true : false}
                  updateing = {updateTelephone? true : false}
                />
              </div>
            );
          })}

         {updateTelephone  &&  <TelephoneUpdate
            owner_id={patient.id}
            create={true}
            owner_type={"patient"}
            controlParent={setDsiplayedPhones}
            showButtons = {true}
          />}


          <div className="inpage-container_record__buttons">
           
      
              <>
                <input
                  className="b3 "
                  type="button"
                  value={updateTelephone? t("done") : t("update")}
                  onClick={() => setUpdateTelephone((prev) => !prev)}
                />
              </>
      
          </div>
        </div>
      </div>

      {!patient.account_email && (
        <div className="page_component__inpage--spanAll ">
          <h2>{t("Email")}</h2>
          <div className="inpage-container_record">
            {patient.account_email}

            {/* <div className="inpage-container_record__buttons">
              {!updateTelephone ? (
                <input
                  className="b3 "
                  type="button"
                  value={"update"}
                  onClick={() => setUpdateTelephone(true)}
                />
              ) : (
                <>
                  <input
                    className="b3 "
                    type="button"
                    value={"submit"}
                    onClick={() => console.log("submit")}
                  />
                  <input
                    className="b3 r"
                    type="button"
                    value={"discard"}
                    onClick={() => setUpdateTelephone((prev) => !prev)}
                  />
                </>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordProfile;
