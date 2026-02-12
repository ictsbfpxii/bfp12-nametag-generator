import { Container, Stack } from "@mui/material";
import type React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10,
      }}
    >
      <Stack
        direction={"row"}
        gap={5}
        sx={{ width: "1225px", display: "flex", justifyContent: "center" }}
      >
        {children}
      </Stack>
    </Container>
  );
}

export default Main;
