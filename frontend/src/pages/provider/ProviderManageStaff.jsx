import React, { useState, useEffect } from "react";
import Employment from "./components/Employment";
import { getAllEmployments } from "./providerApi";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProviderRegisterStaff from "./ProviderRegisterStaff";
import ProviderEmploymentForm from "./ProviderEmploymentForm";
import ProviderStartEmployment from "./ProviderStartEmployment";
function ProviderManageStaff() {
  const [listOfEmployments, setListOfEmployments] = useState([]);

  const { id } = useParams();
  const { t } = useTranslation();

  const getEmployments = async () => {

    const employments = await getAllEmployments(id);
    setListOfEmployments(employments);
  };

  useEffect(() => {
    getEmployments();
  }, []);

  return (
    <>
      <div className="primary-container">
        <h3>{t("all_staff")}</h3>
        {listOfEmployments?.map((employment) => {
          return (
            <Employment
              key={employment.id}
              employmentId={employment.id}
              isActive={employment.is_active ? "true" : "false"}
              staff={employment.staff}
              staffId={employment.staff_id}
              dateEmployed={employment.date_employed}
              salary={employment.salary}
              onDelete={getEmployments}
            />
          );
        })}
      </div>
      <ProviderStartEmployment />
    </>
  );
}

export default ProviderManageStaff;
