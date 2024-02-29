import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", margin: "0", marginBottom: "2rem" }}>
          {title}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </>
  );
}
