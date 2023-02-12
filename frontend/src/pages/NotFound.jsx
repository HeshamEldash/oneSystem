import { fontSize } from '@mui/system'
import React from 'react'
import FlexibleButton from '../components/ui/buttons/FlexibleButton'

function NotFound() {

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
        <h2 style={textStyle}>Looks like this page doesn't exist</h2>
        <FlexibleButton
            value={"Home Page"}
            onClick={()=>location.href = 'http://127.0.0.1:8000/' }
            width = {200}
        />
    </div>
  )
}

export default NotFound
