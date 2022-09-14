import React from 'react'
import * as ECT from '@whoicd/icd11ect';
import '@whoicd/icd11ect/style.css';

function Icd() {
    const mySettings = {
        apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net"   ,
        popupMode: true,
    };
    ECT.Handler.configure(mySettings);
  return (
    <div className='tetingicd'>
        <input type="text" class="ctw-input" autocomplete="off" data-ctw-ino="1"/> 
        <div class="ctw-window" data-ctw-ino="1"></div>
    </div>
  )
}

export default Icd
