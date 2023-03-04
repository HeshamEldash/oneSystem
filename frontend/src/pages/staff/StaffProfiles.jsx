import React from "react";

import StaffProfileItem from "./StaffProfileItem";

import { useTranslation } from "react-i18next";

function StaffProfiles({ profiles }) {
  const { t } = useTranslation();

  return (
    <div className="inner-page-box--flex">
      {profiles?.length === 0 ? (
        <span className="call-to-action__header">
          {t(
            "You don't have any active empoloyments yet, you will need to contact your provider if you think you should have a profile"
          )}
        </span>
      ) : (
        <>
          <div className="inner-page-box--flex-row">
            {profiles?.map((profile) => (
              <StaffProfileItem
                key={profile?.id}
                staff={profile?.staff}
                staffId={profile?.staff_id}
                providerID={profile?.provider_id}
                provider={profile?.provider}
                role={profile.employment_role}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StaffProfiles;
