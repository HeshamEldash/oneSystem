import React from 'react'

function TelephoneBox({telephone_number, index}) {
  return (
    <div>
    <label className='label'>Phone {index}: 
      </label>
      <span>{telephone_number}</span>
    </div>
  )
}

export default TelephoneBox
