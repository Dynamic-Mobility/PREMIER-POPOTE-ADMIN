import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import { AuthGuard } from "../../../hocs/auth-guard";
import PasswordResetDataGrid from "../../../components/popote/users/password-resets-datagrid";

const PasswordResets = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
        Approve Password Reset
      </MKTypography>
      <Card sx={{ p: 3 }}>
        <PasswordResetDataGrid />
      </Card>
    </Container>
  );
};

PasswordResets.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <DashboardLayout>{page}</DashboardLayout>;{/* </AuthGuard> */}
    </>
  );
};

export default PasswordResets;
