import React from 'react'
import { useNavigate } from 'react-router'
import FlexibleButton from '../../components/ui/buttons/FlexibleButton'

function ProviderNotAuthPage() {
  const navigate = useNavigate()
  const pageStyle = {
    display:"flex",
    width:"100%",
    height:"100vh",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
}
const headerStyle ={
    fontWeight:"700",
    fontSize:"3.7em",
    opacity:"80%",
}

const textStyle ={
    fontWeight:"700",
    fontSize:"2.7em",
    opacity:"80%",
}
  return (
    <div style={pageStyle}>
        <h1 style={headerStyle}>Oops!</h1>
        <h2 style={textStyle}>You are not authorized to view this Provider</h2>
        <FlexibleButton
            value={"Go To Dashboard"}
            onClick={()=> navigate('/app/staff-dashboard') }
            width = {200}
        />
    </div>

 
  )
}

export default ProviderNotAuthPage
