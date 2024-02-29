import React from "react";
import { FormWrapper } from "./FormWrapper";
import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

type UserData = {
  name: string;
  age: number;
  sex: string;
  mobile: number;
  govIdType: string;
  govIssueId: number;
};

type userFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

const UserForm = ({
  name,
  age,
  sex,
  mobile,
  govIdType,
  govIssueId,
  updateFields,
  errors,
}) => {
  return (
    <Container>
      <FormWrapper title={"User Details"}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => updateFields({ name: e.target.value })}
              fullWidth
            />
            {errors?.name && <span className="danger">{errors?.name}</span>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              type="text"
              value={age}
              onChange={(e) => updateFields({ age: Number(e.target.value) })}
              fullWidth
            />
            {errors?.age && <span className="danger">{errors?.age}</span>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Sex</InputLabel>
              <Select
                value={sex}
                onChange={(e) => updateFields({ sex: e.target.value })}>
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            {errors?.sex && <span className="danger">{errors?.sex}</span>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile"
              type="number"
              value={mobile}
              onChange={(e) => updateFields({ mobile: e.target.value })}
              fullWidth
            />
            {errors?.mobile && <span className="danger">{errors?.mobile}</span>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gov Issue Id Type</InputLabel>
              <Select
                value={govIdType}
                onChange={(e) => updateFields({ govIdType: e.target.value })}>
                <MenuItem value="">Select Gov Type </MenuItem>
                <MenuItem value="Aadhar">Aadhar</MenuItem>
                <MenuItem value="PAN">Pan</MenuItem>
              </Select>
            </FormControl>
            {errors?.govIdType && (
              <span className="danger">{errors?.govIdType}</span>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Gov Issue Id"
              type="number"
              value={govIssueId}
              onChange={(e) => updateFields({ govIssueId: e.target.value })}
              fullWidth
            />
            {errors?.govIssueId && (
              <span className="danger">{errors?.govIssueId}</span>
            )}
          </Grid>
        </Grid>
      </FormWrapper>
    </Container>
  );
};

export default UserForm;
