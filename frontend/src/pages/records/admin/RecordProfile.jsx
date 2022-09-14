import React, { useEffect, useState } from "react";
import { useRecordContext } from "../context/RecordContextHook";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { boolean } from "yup";

function RecordProfile() {
  const { t } = useTranslation();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updateTelephone, setUpdateTelephone] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  const { patient } = useRecordContext();

  const onSubmit = (values) => {};

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    enableReinitialize,
  } = useFormik({
    initialValues: {
      account_email: patient.account_email,
      first_name: patient?.first_name || "",
      gender: patient.gender,
      last_name: patient.last_name,
      middle_names: patient.middle_names,
      telephone_numbers: patient.telephone_numbers?.map(
        (tel) => tel.telephone_number
      ),
      address: {
        unit_number: patient.address?.unit_number,
        first_line: patient.address?.first_line,
        second_line: patient.address?.second_line,
        city: patient.address?.city,
        governorate: patient.address?.governorate,
      },
    },
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="page-component-main--grid">
      <h1 className="page_component__inpage--spanAll">Patient_profile</h1>

      <div className="page_component__inpage--spanAll ">
        <h2>Profile</h2>
        <div className="inpage-container_record">



        <div className="input_component">
          <label className="label"> {t("first_name")}:</label>

          {updateProfile ? (
            <input
              type="text"
              name="first_name"
              className={
                errors.firstName && touched.firstName
                  ? "input-error form-fields"
                  : "form-fields"
              }
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <span>{patient.first_name}</span>
          )}
        </div>


        <div className="input_component">
          <label className="label"> {t("middle_names")}:</label>
          {updateProfile ?
          <input
            type="text"
            name="middle_names"
            className={
              errors.middle_names && touched.middle_names
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.middle_names}
            onChange={handleChange}
            onBlur={handleBlur}
          /> : (
            <span>{patient.middle_names}</span>
          )}
        </div>


        <div className="input_component">
          <label className="label"> {t("last_name")}:</label>
          {updateProfile ?
          <input
            type="text"
            name="last_name"
            className={
              errors.last_name && touched.last_name
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          : (
            <span>{patient.last_name}</span>
          )}
          </div>
          <div className="inpage-container_record__buttons">
                {!updateProfile ? 
                <input  className="b3 " type="button" value={"update"} onClick={()=>setUpdateProfile(true)}/>
                :<>
                <input className="b3 "  type="button" value={"submit"} onClick={()=>console.log("submit")}/>
                <input  className="b3 r" type="button" value={"discard"} onClick={()=>setUpdateProfile((prev)=>!prev)}/>
                </>
            }
            
            </div>
        </div>
         

      </div>

      <div className="page_component__inpage--span2">
           <h2> {t("address")}</h2>
            <div className="inpage-container_record inpage-container_record--just_left">

            {!updateAddress? 
                <div>
                <span className="large_font">{patient?.address?.unit_number}  </span>
                <br/>
                <span className="large_font"> {patient?.address?.first_line}  </span>
                <br/>
                <span className="large_font"> {patient?.address?.second_line}  </span>
                <br/>
                <span className="large_font">{patient?.address?.city} </span>
                <br/>
                <span className="large_font">{patient?.address?.governorate} </span>
                
                
                </div>
            :
        <>
         <div className="">

          <label> {t("unit_number")}</label>
          <input
            type="text"
            name="address.unit_number"
            className={
              errors.middle_names && touched.middle_names
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.address.unit_number}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div> 
         <div>
          <label> {t("first_line")}</label>
          <input
            type="text"
            name="address.first_line"
            className={
              errors.middle_names && touched.middle_names
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.address.first_line}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div> 
         <div>
          <label> {t("second_line")}</label>
          <input
            type="text"
            name="address.second_line"
            className={
              errors.middle_names && touched.middle_names
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.address.second_line}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div> 
         <div>
          <label> {t("city")}</label>
          <input
            type="text"
            name="address.city"
            className={
              errors.middle_names && touched.middle_names
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.address.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div> 
         <div>
          <label> {t("governrate")}</label>
          <input
            type="text"
            name="address.governorate"
            className={
              errors.middle_names && touched.middle_names
                ? "input-error form-fields"
                : "form-fields"
            }
            value={values.address.governorate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div> 


        </>
        }

        <div className="inpage-container_record__buttons">
                {!updateAddress ? 
                <input  className="b3 " type="button" value={"update"} onClick={()=>setUpdateAddress(true)}/>
                :<>
                <input className="b3 "  type="button" value={"submit"} onClick={()=>console.log("submit")}/>
                <input  className="b3 r" type="button" value={"discard"} onClick={()=>setUpdateAddress((prev)=>!prev)}/>
                </>
            }
            
            </div>

        </div>
        
    
        


      </div>














      <div className="page_component__inpage--span2 ">
            <h2>{t("telephone_numbers")}</h2>
            <div className="inpage-container_record">
        {values?.telephone_numbers?.map((telephone, index) => {
          return <span key={index}> {telephone}</span>;
        })}

        <div className="inpage-container_record__buttons">
                {!updateTelephone ? 
                <input  className="b3 " type="button" value={"update"} onClick={()=>setUpdateTelephone(true)}/>
                :<>
                <input className="b3 "  type="button" value={"submit"} onClick={()=>console.log("submit")}/>
                <input  className="b3 r" type="button" value={"discard"} onClick={()=>setUpdateTelephone((prev)=>!prev)}/>
                </>
            }
            
            </div>
        </div>
      </div>


      {!patient.account_email && 
      <div className="page_component__inpage--span2 ">
      <h2>{t("Email")}</h2>
      <div className="inpage-container_record">
         {patient.account_email}

         <div className="inpage-container_record__buttons">
                {!updateTelephone ? 
                <input  className="b3 " type="button" value={"update"} onClick={()=>setUpdateTelephone(true)}/>
                :<>
                <input className="b3 "  type="button" value={"submit"} onClick={()=>console.log("submit")}/>
                <input  className="b3 r" type="button" value={"discard"} onClick={()=>setUpdateTelephone((prev)=>!prev)}/>
                </>
            }
            
            </div>
      </div>
      </div>
      }
    </div>


  );
}

export default RecordProfile;
