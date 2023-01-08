import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import StaffProfileItem from "./StaffProfileItem";
import {
  getLogins,
  createLogin,
  endLogin,
} from "../../utils/api_calls/getLogins";
import { useTranslation } from "react-i18next";

import { getStaffProfile } from "./staffApi";

function StaffProfiles() {
  const { t } = useTranslation();

  const [profiles, setProfiles] = useState([]);

  const getDetails = async () => {
    const staffProfiles = await getStaffProfile();
    setProfiles(staffProfiles);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="inner-page-box--flex">
      {profiles.length === 0 ? (
        <span className="call-to-action__header">
          {t(
            "You don't have any active empoloyments yet, you will need to contact your provider if you think you should have a profile"
          )}
        </span>
      ) : (
        <>
          {/* <h3>{t("my_profiles")}</h3> */}
          <div className="inner-page-box--flex-row">
            {profiles?.map((profile) => (
              <StaffProfileItem
                key={profile?.id}
                staff={profile?.staff}
                staffId={profile?.staff_id}
                providerID={profile?.provider_id}
                provider={profile?.provider}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StaffProfiles;
