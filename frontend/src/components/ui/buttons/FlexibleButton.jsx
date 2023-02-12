import React from 'react'

function FlexibleButton({onClick,value, width}) {
  return (
    <input 
    style={{width:width}}
    className='page_button-width-small-fixed2 page_button  page_button-padding-inline-small '
    type="button" onClick={() => onClick()} value={value} />

  )
}

export default FlexibleButton
