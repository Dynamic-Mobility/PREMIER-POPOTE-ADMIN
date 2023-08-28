import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";


const Parameters = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
          Parameters Management
        </MKTypography>
        <Card sx={{ p: 3 }}>
        </Card>
      </Container>
    </>
  );
};

Parameters.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <DashboardLayout>{page}</DashboardLayout>; // {/* </AuthGuard> */}
    </>
  );
};

export default Parameters;
