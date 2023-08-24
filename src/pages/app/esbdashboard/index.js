import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container,Typography } from "@mui/material";

const EsbDashboard = () => {
  return (
    <Container maxWidth="xl">
      <Typography sx={{py:2}} fontWeight={'bold'} fontSize={'20px'}>Esb Dashboard</Typography>
    </Container>
  );
};

EsbDashboard.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default EsbDashboard;
