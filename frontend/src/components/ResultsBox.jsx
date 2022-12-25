import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableBody from "@mui/material/TableBody";
import { TableContainer } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';

function ResultsBox(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: props.headerBackground,
          color: theme.palette.common.white,
    
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
  
  return (
    <div className="results-bosx inner-page-box">
    <TableContainer  sx={{ maxHeight: 440 }}>
      <Table size={props.tableSize} stickyHeader={props.stickyHeader}>
        <TableHead>
          <StyledTableRow>
            {props.headerElements?.map((item, index) => (
              <StyledTableCell
              key={index}
              >
              
              {item}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
               {props?.children?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            

        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.paginationCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

    </div>
  );
}

export default ResultsBox;
