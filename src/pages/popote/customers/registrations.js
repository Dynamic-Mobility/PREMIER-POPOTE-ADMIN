import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import { AuthGuard } from "../../../hocs/auth-guard";
import RegistrationsDatagrid from "../../../components/popote/customers/registrations-datagrid";

const Registrations = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
        Approve Registrations
      </MKTypography>
      <Card sx={{ p: 3 }}>
        <RegistrationsDatagrid />
      </Card>
    </Container>
  );
};

Registrations.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <DashboardLayout>{page}</DashboardLayout>;{/* </AuthGuard> */}
    </>
  );
};

export default Registrations;
