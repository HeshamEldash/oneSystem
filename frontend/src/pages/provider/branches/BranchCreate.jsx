import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ProviderContext } from "../context/ProviderContext";
import MediumInput from "../../../components/ui/inputs/MediumInput";
import SmallButton from "../../../components/ui/SmallButton";
import { createBranch } from "../providerApi";

function BranchCreate() {
  const { t } = useTranslation();
  const { providerId, setBranches } = useContext(ProviderContext);
  const [open, setOpen] = useState(false);

  const onSubmit = async (values, actions) => {
    await createBranch(values).then((branch) => {
      setBranches((branches) => [...branches, branch]);
      actions.resetForm();
      setOpen(false)
    });
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      provider: providerId,
      branch_name: "",
      unit_number: "",
      first_line: "",
      second_line: "",
      city: "",
      governorate: "",
      telephone_number: "",
    },
    onSubmit,
  });
  return (
    <div>
      <h1>Branch create</h1>
      {open ?  
      <>
        <MediumInput
          value={values.branch_name}
          label={t("branch name")}
          onChange={handleChange}
          name="branch_name"
          handleBlur={handleBlur}
        />
        <MediumInput
          value={values.unit_number}
          label={t("unit_number")}
          onChange={handleChange}
          name="unit_number"
          handleBlur={handleBlur}
        />
        <MediumInput
          value={values.first_line}
          label={t("first_line")}
          onChange={handleChange}
          name="first_line"
          handleBlur={handleBlur}
        />
        <MediumInput
          value={values.second_line}
          label={t("second_line")}
          onChange={handleChange}
          name="second_line"
          handleBlur={handleBlur}
        />
        <MediumInput
          value={values.city}
          label={t("city")}
          onChange={handleChange}
          name="city"
          handleBlur={handleBlur}
        />
        <MediumInput
          value={values.governorate}
          label={t("governorate")}
          onChange={handleChange}
          name="governorate"
          handleBlur={handleBlur}
        />
        <MediumInput
          value={values.telephone_number}
          label={t("telephone_number")}
          onChange={handleChange}
          name="telephone_number"
          handleBlur={handleBlur}
        />

        <SmallButton onClick={() => handleSubmit()} value="create" />
      </>:
      <SmallButton onClick={()=>setOpen(true)} value="submit" />

      }
    </div>
  );
}

export default BranchCreate;
