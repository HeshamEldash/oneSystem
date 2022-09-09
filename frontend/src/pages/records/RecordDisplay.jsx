import React from "react";
import "./records.css";
function RecordDisplay(props) {
  return (
    <div className="record">

      <div className="record__header">
        created by: Dr Hesham Eldash @ 08/08/2022 10:10
        {props.header}
      </div>

      <div className="record_body">
        <div className="record__entry_container">
          <span className="record__entry_begining">Hx:</span>
          {props.history}
         </div>

        <div className="record__entry_container">
          <span className="record__entry_begining">Ex:</span>
          {props.examination}

         
        </div>  

        <div className="record__entry_container">
          <span className="record__entry_begining">Dx:</span>
          {props.diagnosis}

         
        </div>

        <div className="record__entry_container">
          <span className="record__entry_begining">Mx:</span>
          {props.plan}
          
        </div>
      </div>
      <div className="records__actions_container">any actions</div>


        {props.actions && 
      <div className="records__actions_container">any actions</div>
    }


    </div>
  );
}

export default RecordDisplay;
