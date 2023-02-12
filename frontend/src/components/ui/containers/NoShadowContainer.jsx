import React from 'react'

function NoShadowContainer({children}) {
  return (
    <div className="inner-page-box inner-page-box--flex box_mins_width" style={{boxShadow: 'none'}}>
      {children}
    </div>
  )
}

export default NoShadowContainer
