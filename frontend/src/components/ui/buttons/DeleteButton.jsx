import React from 'react'

function DeleteButton({onClick, value}) {
  return (
    <input
        className='page_button page_button-width-small-fixed2 page_button_delete'

        type="button"
        onClick = {()=>onClick()}
        value = {value}
    />
  )
}

export default DeleteButton
