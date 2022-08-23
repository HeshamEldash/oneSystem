import React from 'react'

function Navbar({children}) {
  return (
    <div className='main-navbar'>
      This is the nav bar
      {children}
    </div>
  )
}

export default Navbar