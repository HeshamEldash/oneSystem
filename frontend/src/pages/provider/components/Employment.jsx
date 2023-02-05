import React, { useState, useEffect } from "react";
import { getLogins } from "../../../api/getLogins.js";
import { getStaffEmployments as getStaffProfile } from "../../staff/api/staffApi";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { TableContainer } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { endEmployment } from "../api/providerApi";

function Employment(props) {
  const [staff, setStaff] = useState({});
  const [logins, setLogins] = useState([]);
  const { id } = useParams();
  const [showLogins, setShowLogins] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "day", label: "day", minWidth: 170 },
    { id: "login", label: "login", minWidth: 170 },
    {
      id: "logout",
      label: "logout",
      minWidth: 100,

      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  const endApiEmployment = ()=>{
    endEmployment(props.employmentId)
    props.onDelete()
  }
  const getApiData = async () => {
    const data = await getStaffProfile(props.staffId);
    setStaff(data);
    const loginData = await getLogins(props.staffId, id);
    setLogins(loginData);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="inner-page-box   margin_bottom_small">
      <table>
      <tbody>
      <tr>
          <td>staff_email</td>
          <td> {staff?.staff_email}</td>
        </tr>
        <tr>
          <td>staff_name</td>
          <td> {props.staff}</td>
        </tr>
        <tr>
          <td>staff_role</td>
          <td> {staff?.staff_role}</td>
        </tr>
        <tr>
          <td>date_employed</td>
          <td> {props.dateEmployed}</td>
        </tr>
        <tr>
          <td>salary</td>
          <td> {props.salary}</td>
        </tr>
        <tr>
          <td>active</td>
          <td> {props.isActive}</td>
        </tr>
        </tbody>
      </table>
      <div className="inpage-container__footer">
      <input
        className="page_button page_button-width-small-fixed"
        type="button"
        value={"login_details"}
        onClick={() => {
          setShowLogins((prev) => !prev);
        }}
      />
      <input className="page_button page_button-width-small-fixed" type="button" value={"edit"} />
      <input className="page_button page_button-width-small-fixed" type="button" value={"remove"}
      onClick={()=>endApiEmployment()}
       />
       </div>

      {showLogins && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {logins
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  .map((login) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={login.id}
                      >
                        <TableCell>{login.id}</TableCell>
                        <TableCell>{login.start_time}</TableCell>
                        <TableCell>{login.end_time}</TableCell>
                        {/* {columns.map((column) => {
                        
                      return (
                        <TableCell key={column.id} align={column.align}>
                        {login.start_time}
                        </TableCell>
                      ); */}
                        {/* })} */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={logins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}

export default Employment;
