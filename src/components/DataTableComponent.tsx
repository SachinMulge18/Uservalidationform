import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";

import { useSelector } from "react-redux";
import { FormWrapper } from "./FormWrapper";

const DataTableComponent = () => {
  const userData = useSelector((state: RootState) => state.user);
  console.log(userData?.user?.length);
  return (
    <>
      {userData?.user?.length > 0 && (
        <Container>
          <FormWrapper title={"User Information"}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Adrress</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>Pincode</TableCell>
                  </TableRow>
                </TableHead>
                +
                <TableBody>
                  {userData?.user?.map((user, index) => (
                    <>
                      <TableRow>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.age}</TableCell>
                        <TableCell>{user?.sex}</TableCell>
                        <TableCell>{user?.mobile}</TableCell>
                        <TableCell>{user?.address}</TableCell>
                        <TableCell>{user?.state}</TableCell>
                        <TableCell>{user?.city}</TableCell>
                        <TableCell>{user?.country}</TableCell>
                        <TableCell>{user?.pincode}</TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FormWrapper>
        </Container>
      )}
    </>
  );
};

export default DataTableComponent;
