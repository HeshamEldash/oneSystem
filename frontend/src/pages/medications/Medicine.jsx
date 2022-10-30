import React from 'react'

function Medicine({drug, selectMedicine, selected}) {

  const handleClick = ()=>{
    selectMedicine && selectMedicine(drug)
  }

  return (
    <div 
    onClick={handleClick}
    // className="medication_main padding_inline-small cursor_pointer light_border_bottom shallow_shadow padding_block_small margin_bottom_small"
    className={selected?  
    "medication_selected"
    :
    "medication_main padding_inline-small cursor_pointer light_border_bottom shallow_shadow padding_block_small margin_bottom_small"
    
    }
    
    
    
    >
      <h3>{drug.name}</h3>
    </div>
  )
}

export default Medicine
