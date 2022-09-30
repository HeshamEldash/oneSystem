import React from 'react'
import * as ECT from '@whoicd/icd11ect';
import '@whoicd/icd11ect/style.css';

function Icd() {
    const mySettings = {
        apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net"   ,
        popupMode: false,
    };

    const myCallbacks ={
      selectedEntityFunction: (selectedEntity) => {
        console.log(selectedEntity)
    },
    }

    ECT.Handler.configure(mySettings, myCallbacks);
  return (
    <div className='tetingicd'>
        <input type="text" className="ctw-input" autoComplete="off" data-ctw-ino="1"/> 
        <div className="ctw-window" data-ctw-ino="1"></div>
    </div>
  )
}

export default Icd
