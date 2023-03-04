import React from 'react'
import { useTranslation } from 'react-i18next';


function TelephoneBox({telephone_number, index}) {
  const { t } = useTranslation();

  return (
    <div>
    <label className='label'>{t("Phone")} {index}: 
      </label>
      <span>{telephone_number}</span>
    </div>
  )
}

export default TelephoneBox
