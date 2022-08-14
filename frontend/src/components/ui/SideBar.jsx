import React from 'react'
import "./ui.css"

function SideBar({children}) {
  return (
    <div className='main-sidebar'>
        this is staff side bar
        {children}
    </div>
  )
}

export default SideBar
