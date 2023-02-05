import React, { useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { updateProviderProfile } from "./api/providerApi";
import BranchDisplayBox from "./branches/BranchDisplayBox";
import { ProviderContext } from "./context/ProviderContext";
import BranchCreate from "./branches/BranchCreate";
import { useUpdateProvider } from "./api/useProviderDataApi";

function ProviderProfileUpdate() {
  const { profile, branches } = useContext(ProviderContext);

  const { t } = useTranslation();

  const [updating, setUpdating] = useState(false);
  const profileUpdater= useUpdateProvider()

  const  nameRef = useRef()
  const updateProfile = async () => {
 
    profileUpdater.mutate({
      provider_id: profile.id,
      data: nameRef.current.value,
    });
  };

  return (
    <div className="page_padding_bottom">
      <>
        <div className="primary--page-box">
          <h1 className="margin_bottom_small"> {t("profile_information")}</h1>
          <h4 className="subtitle">{t("name")}: </h4>
          {updating ? (
            <input
              ref={nameRef}
              className="form-fields"
              value={nameRef.current}
              
            />
          ) : (
            profile?.name
          )}
          <br />
          <h4 className="subtitle">{t("owner")}:</h4>
          {profile?.owner_email}
          <br />
          <h4 className="subtitle">{t("date_create")}:</h4>
          {profile?.date_created}
          <br />

          <input
            type="button"
            className="page_button page_button-width-small-fixed "
            value={updating ? t("save") : t("update")}
            onClick={() => {
              setUpdating((prev) => !prev);
              updating && updateProfile();
            }}
          />
        </div>

        <div className="primary--page-box">
          <h2>bracnhes</h2>
          {branches?.map((branch) => {
            return <BranchDisplayBox key={branch.id} branch={branch} />;
          })}
        </div>

        <div className="primary--page-box">
            <BranchCreate/>
        </div>
      </>
    </div>
  );
}

export default ProviderProfileUpdate;
