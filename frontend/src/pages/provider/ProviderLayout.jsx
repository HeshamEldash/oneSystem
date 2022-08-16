import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from '../../components/ui/Navbar'
import SideBar from '../../components/ui/SideBar'
function ProviderLayout() {
  return (
    <>
        <Navbar/>
      <SideBar/>
      <Outlet/>

    </>
  )
}

export default ProviderLayout
