import React from 'react'
import Slot from './Slot.jsx'

function Clinic(props) {
  return (
    <div className='clinic_box'>
      <div className='clinic_box--header'>Dr {props.clinican.first_name + " " + props.clinican.last_name}</div>

      {props.children}
      
    </div>
  )
}

export default Clinic
