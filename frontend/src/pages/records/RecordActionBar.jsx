import React from "react";
import { useTranslation } from "react-i18next";

function RecordActionBar(props) {
  const { t } = useTranslation();

  return (
    <div className="action_bar">
      {props.items?.map((item) => {
        return (
          <div 
          key = {item.name}
          className="action_bar__element"
          onClick={
            ()=>{
          item.func()      

            }
          }
          >
            {item.name}
          </div>
        );
      })}
      {props.children}
    </div>
  );
}

export default RecordActionBar;
