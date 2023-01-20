import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { updateProviderProfile } from "./providerApi";
import BranchDisplayBox from "./branches/BranchDisplayBox";
import { ProviderContext } from "./context/ProviderContext";
import BranchCreate from "./branches/BranchCreate";

function ProviderProfileUpdate() {
  const { profile, branches, setProfile } = useContext(ProviderContext);

  const { t } = useTranslation();

  const [updating, setUpdating] = useState(false);

  const updateProfile = async () => {
    updateProviderProfile({
      provider_id: profile.id,
      data: profile.name,
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
              className="form-fields"
              onChange={(e) => {
                setProfile((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              value={profile?.name}
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
