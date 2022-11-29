import React from 'react'
import useContextMenu from './hooks/useContextMenu'

function ContextMenuItem({name, func}) {

    
  return (
    <div className='ContextMenuItem' onClick={()=>func()}>
        <span>{name}</span>
    </div>
  )
}

export default ContextMenuItem
