import React from 'react'
import { BrowserRouter as Router, Route, Routes,NavLink, Link , useParams} from "react-router-dom";


function PatientRegsitrations() {
  const { id } = useParams();

  return (
    <div>
      this patient registration form
      {id }
    </div>
  )
}

export default PatientRegsitrations
