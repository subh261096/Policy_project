import React, { useState } from "react";
import Policy from "../policy/policy";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { formatDate } from "../services/formatData";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// handle Policies Listing in this Component
const Policies = ({ items }) => {
  const [policies, setPolicies] = useState(items);
  const updatePolicy = (updatedResult) => {
    const copyPolicies = [...policies]
    policies.find((policy, i) => {
      if (policy.policy_id === updatedResult.policy_id) {
        copyPolicies[i] = updatedResult;
        return true;
      }
      return false;
    });
    setPolicies(copyPolicies);
  };
  const mappedPolicies = policies.map((data) => {
    data["date_of_purchase"] = formatDate(data["date_of_purchase"]);
    return (
      <Policy policy={data} key={data.policy_id} callback={updatePolicy} />
    );
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Policy Id</StyledTableCell>
            <StyledTableCell align="center">Date of Purchase</StyledTableCell>
            <StyledTableCell align="center">Customer Id</StyledTableCell>
            <StyledTableCell align="center">Premium</StyledTableCell>
            <StyledTableCell align="center" sx={{ width: "10%" }}>
              Options
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mappedPolicies}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Policies;
