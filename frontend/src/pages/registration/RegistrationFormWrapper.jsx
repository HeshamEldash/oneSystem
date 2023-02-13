import React from 'react'

function RegistrationFormWrapper({children}) {
  return (
    <div style={{backgroundColor:"white", height:"fit-content",  
        boxShadow:"var(--deepShadow)",paddingInline:"3rem",paddingBlock:"2rem",
        borderRadius:"10px", maxWidth:"800px"
    }}>

      {children}
    </div>
  )
}

export default RegistrationFormWrapper
