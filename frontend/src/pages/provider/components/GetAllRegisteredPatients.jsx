import React, { useState, useEffect } from "react";
import ResultsBox from "../../../components/ResultsBox";
import { useParams, useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { getAllPatients } from "../api/providerApi";


function GetAllRegisteredPatients({setNumberOfPatients}) {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate()
  const { id } = useParams();


  const getPatients = async()=>{
   const patientData = await getAllPatients(id)
   setPatients(patientData)
   setNumberOfPatients(patientData.length)
  }
  useEffect(()=>{
    getPatients()
  },[])
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  return (
    <div>
      <ResultsBox
        headerElements={[
          "first name",
          "second name",
          "last name",
          "date of birth",
          "telephone number",
          "email",
          "address",
        ]}
        paginationCount={patients?.length}
        tableSize=""
        stickyHeader={true}
        headerBackground={"#a9459a"}
      >
        {patients?.map((patient) => {
          return (
            <StyledTableRow
              key={patient.id}
              onDoubleClick={() => {
                navigate(`/app/provider/${id}/patient-record/${patient.patient_detial.id}`)
              }}
            >
              <StyledTableCell>{patient.patient_detial.first_name}</StyledTableCell>
              <StyledTableCell>{patient.patient_detial.middle_names}</StyledTableCell>
              <StyledTableCell>{patient.patient_detial.last_name}</StyledTableCell>
              <StyledTableCell>{patient.patient_detial.date_of_birth}</StyledTableCell>
              <StyledTableCell>
                {patient.patient_detial.telephone_numbers &&
                  patient.patient_detial.telephone_numbers[0]?.telephone_number}
              </StyledTableCell>
              <StyledTableCell>{patient?.patient_detial?.account_email}</StyledTableCell>
              <StyledTableCell>
                {patient.patient_detial.address &&
                  patient.patient_detial.address.unit_number +
                    " " +
                    patient.patient_detial.address.first_line +
                    " " +
                    patient.patient_detial.address.city}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </ResultsBox>


    </div>
  )
}

export default GetAllRegisteredPatients
