import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableCell } from "@mui/material";

function ResultsBox(props, { children }) {
  return (
    <div className="results-box">
      <Table>
        <TableHead>
          <TableRow>
            {props.headerElements?.map((item) => (
              <TableCell>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        
      </Table>

      {children}
    </div>
  );
}

export default ResultsBox;
