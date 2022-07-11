import React, { useState } from "react";
import "./policy.css";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ViewPolicy from "../viewPolicy/viewPolicy";
import EditPolicy from "../editPolicy/editPolicy";
import { Stack } from "@mui/material";

// Handle each Policy in this Component
const Policy = ({ policy, callback }) => {
  const [item, setItem] = useState(policy);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
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

  const handleCallback = (results) => {
    setItem(results);
    callback(results);
  };

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row" align="center">
        {item.policy_id}
      </StyledTableCell>
      <StyledTableCell align="center">{item.date_of_purchase}</StyledTableCell>
      <StyledTableCell align="center">{item.customer_id}</StyledTableCell>
      <StyledTableCell align="center">{item.premium}</StyledTableCell>
      <StyledTableCell align="center">
        <Stack direction="row" spacing={1}>
          <ViewPolicy results={item} />
          <EditPolicy results={item} callbackUpdate={handleCallback} />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default Policy;
