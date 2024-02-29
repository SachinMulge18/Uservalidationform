import { useState, useEffect } from "react";
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

const AddressForm = ({
  address,
  state,
  city,
  country,
  pincode,
  updateFields,
}) => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = (name) => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Container>
      <FormWrapper title={"Address Details"}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              type="text"
              value={address}
              onChange={(e) => updateFields({ address: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              type="text"
              value={state}
              onChange={(e) => updateFields({ state: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              type="text"
              value={city}
              onChange={(e) => updateFields({ city: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                label="Country"
                value={country}
                onChange={(e) => updateFields({ country: e.target.value })}>
                {countries?.map((curr) => (
                  <MenuItem value={curr?.name?.common}>
                    {curr?.name?.common}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Pincode"
              type="number"
              value={pincode}
              onChange={(e) => updateFields({ pincode: e.target.value })}
              fullWidth
            />
          </Grid>
        </Grid>
      </FormWrapper>
    </Container>
  );
};

export default AddressForm;
