import React from 'react'

function SmallButton({onClick,value}) {
  return (
    <input 
    className='page_button-width-small-fixed2 page_button  page_button-padding-inline-small '
    type="button" onClick={() => onClick()} value={value} />

  )
}

export default SmallButton
