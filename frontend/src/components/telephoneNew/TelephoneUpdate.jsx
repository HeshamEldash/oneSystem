import React from 'react'
import MediumInput from '../ui/inputs/MediumInput';
import SmallButton from '../ui/SmallButton';
import remove from "../../assets/images/remove2.svg"

function TelephoneUpdate({values, submit,removePhone, addNewPhone, handleChange}) {
  return (
    <div>
      {values?.map((number, index) => {
            return (
              <div className="input_container"
              key={index}>
                <MediumInput
                  label={`Phone ${index + 1} `}
                  value={number}
                  onChange={handleChange}
                  name={index}
                />


                <img 
                className='svg30 svg_cursor svg_white'
                src={remove}

                onClick={()=>removePhone(index)}
                />
         
              </div>
            );
          })}
          <div className="flex-row inner-page-box--flex-row">
            <SmallButton onClick={() => submit()} value="submit" />
            <SmallButton onClick={() => addNewPhone()} value="add" />
          </div>
    </div>
  )
}

export default TelephoneUpdate
