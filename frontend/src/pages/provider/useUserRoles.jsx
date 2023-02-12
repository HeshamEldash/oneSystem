import React, { useState } from 'react'

function useUserRoles(current_user_roles = [] ) {

    console.log(current_user_roles)
    const  [isManager,setIsManager] = useState(false)
    const  [isAdmin,setIsAdmin] = useState(false)
    const  [isOwner,setIsOwner] = useState(false)
    const  [isNurse,setIsNurse] = useState(false)
    const  [isDoctor,setIsDoctor] = useState(false)

    if (current_user_roles.includes("MG")){
    setIsManager(true)
    }
    if (current_user_roles.includes("AD")){
        setIsAdmin(true)

    }
    if (current_user_roles.includes("OW")){
        setIsOwner(true)
    }
    if (current_user_roles.includes("DR")){
        setIsDoctor(true)
    }


  return (
    [isManager,isAdmin, isOwner, isNurse, isDoctor]
  )
}

export default useUserRoles
