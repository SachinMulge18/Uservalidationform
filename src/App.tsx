import { useState, FormEvent } from "react";
import { useMultiStepForm } from "./hooks/useMultiStepForm.ts";
import UserForm from "./components/UserForm";
import AddressForm from "./components/AddressForm";
import * as yup from "yup";
import "./App.css";
import { Container, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./features/userSlice.ts";
import DataTableComponent from "./components/DataTableComponent";

type FormData = {
  name: string;
  age: number;
  sex: string;
  mobile: number;
  govIdType: string;
  govIssueId: number;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: number;
};

const INITIAL_DATA: FormData = {
  name: "",
  age: "",
  sex: "",
  mobile: "",
  govIdType: "",
  govIssueId: "",
  address: "",
  state: "",
  city: "",
  country: "",
  pincode: "",
};

const App = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const userData = useSelector((state: RootState) => state.user);
  console.log(userData);
  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <UserForm {...data} updateFields={updateFields} errors={errors} />,
      <AddressForm {...data} updateFields={updateFields} />,
    ]);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(3),
    age: yup
      .number()
      .typeError("Age must be number")
      .required("Age is required"),
    sex: yup.string().required("Sex is required"),
    mobile: yup
      .string()
      .required("Mobile is required")
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
    govIdType: yup.string().required("Gov Id Type is required"),
    govIssueId: yup
      .string()
      .matches(/^[2-9]\d{11}$/, "Invalid id ")
      .required("Id required"),
  });

  const validateFields = async () => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors: { [key: string]: string } = {};
      error?.inner?.forEach((err: any) => {
        newErrors[err?.path] = err?.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = await validateFields();
    const allFieldsEntered = Object.values(data).every(
      (value) => value !== "" && value !== 0
    );

    if (isLastStep && isValid && allFieldsEntered) {
      dispatch(updateUser(data));
      back();
      setData(INITIAL_DATA);
    } else if (!isLastStep && isValid) {
      next();
    }
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            position: "relative",
            border: "1px solid black",
            padding: "2rem",
            margin: "1rem",
            borderRadius: "10px",
          }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ position: "absolute", top: ".5rem", right: "5rem" }}>
              <Typography variant="h5" sx={{ letterSpacing: "1.5px" }}>
                {currentStepIndex + 1}/{steps.length}
              </Typography>
            </Box>
            {step}
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                gap: ".5rem",
                gap: ".5rem",
                justifyContent: "flex-end",
              }}>
              {!isFirstStep && (
                <Button variant="outlined" onClick={back}>
                  Back
                </Button>
              )}
              <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                {isLastStep ? "Finish" : "Next"}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <DataTableComponent />
    </>
  );
};

export default App;
