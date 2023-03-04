import React, { useEffect, useState } from 'react'
import { useGetStaffEmployments } from '../staff/api/useStaffDataApi'

function useUserRoles(provider_id) {

    const {data:staffEmployments} = useGetStaffEmployments()

    const current_user_roles = staffEmployments?.filter(emp=>{
      if(emp?.provider_id == provider_id){
        return emp
         }
      }).map(emp=> emp?.employment_role)

    const user_perms = {
      isManager: current_user_roles?.includes("MG"),
      isAdmin: current_user_roles?.includes("AD"),
      isOwner:current_user_roles?.includes("OWNER"),
      isDoctor: current_user_roles?.includes("DR"),

    }


  return user_perms
}

export default useUserRoles
