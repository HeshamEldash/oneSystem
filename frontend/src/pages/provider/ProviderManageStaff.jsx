import React, {useState, useEffect} from 'react'
import Employment from './components/Employment'
import { getAllEmployments } from './providerApi'
import {useParams} from "react-router-dom"
function ProviderManageStaff() {
    const [listOfEmployments, setListOfEmployments] = useState([])
    
    const {id} = useParams()
    const getEmployments = async ()=>{
        const employments = await getAllEmployments(id)
        setListOfEmployments(employments)

    }
useEffect(()=>{
    

    getEmployments()

},[])
  return (
    <div>

    {listOfEmployments?.map((employment)=>{
        return <Employment
        key = {employment.id}
        employmentId = {employment.id}

        staff= {employment.staff}
        staffId  = {employment.staff_id}
        dateEmployed=  {employment.date_employed}
        salary ={employment.salary}
      />
    })}
    </div>
  )
}

export default ProviderManageStaff
