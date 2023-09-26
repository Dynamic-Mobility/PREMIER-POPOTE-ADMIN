import React from "react";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import PasswordResetDataGrid from "../../../components/dashboard/users/password-resets-datagrid";
import ModernLayout from "../../../components/layouts/modern";

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
      <ModernLayout>{page}</ModernLayout>;{/* </AuthGuard> */}
    </>
  );
};

export default PasswordResets;
