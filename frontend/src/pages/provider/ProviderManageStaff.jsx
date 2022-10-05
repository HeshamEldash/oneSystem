import React, { useState, useEffect } from "react";
import Employment from "./components/Employment";
import { getAllEmployments } from "./providerApi";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import ProviderRegisterStaff from "./ProviderRegisterStaff";
import ProviderEmploymentForm from "./ProviderEmploymentForm";
import ProviderStartEmployment from "./ProviderStartEmployment";

import Circle from "../../components/Circle";
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
      <h1 className="page_header padding_inline-header">{t("manage_staff")}</h1>

      <div className=" primary--page-box primary--page-box-contents_centered">
        <h3 className="margin_bottom_small">{t("total_number_of_staff")}</h3>
        
        <div>
        <Circle>{listOfEmployments.length}</Circle>
        </div>
      </div>

      <div className=" primary--page-box ">
        <h3 className="margin_bottom_small">{t("all_staff")}</h3>
        <div className="page_component__inpage--scroll_box">
        {listOfEmployments ? (
          listOfEmployments?.map((employment) => {
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
          })
        ) : (
          <>
            <Skeleton variant="rounded" width={600} height={150} />
            <br />
            <Skeleton variant="rounded" width={600} height={150} />
          </>
        )}
        </div>
      </div>

      <ProviderStartEmployment />
    </>
  );

  return (
    <div className="page-component-main--grid">
      <div className="page_component__inpage--span3 page_component__inpage--scroll_box inpage-container">
        <h3>{t("all_staff")}</h3>
        {listOfEmployments ? (
          listOfEmployments?.map((employment) => {
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
          })
        ) : (
          <>
            <Skeleton variant="rounded" width={600} height={150} />
            <br />
            <Skeleton variant="rounded" width={600} height={150} />
          </>
        )}
      </div>
      <div className="inpage-container page_component__inpage--span1 inpage-container--centered">
        <h3>total_number_of_staff</h3>
        <Circle>{listOfEmployments.length}</Circle>
      </div>

      <ProviderStartEmployment />
    </div>
  );
}

export default ProviderManageStaff;
