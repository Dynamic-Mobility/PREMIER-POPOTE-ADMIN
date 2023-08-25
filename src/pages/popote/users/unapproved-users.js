import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Typography, Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import UnapprovedDataGrid from "../../../components/popote/users/unapproved-datagrid";


const UnapprovedUsers = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
          Unapproved Users
        </MKTypography>
        <Card sx={{ p: 3 }}>
          <UnapprovedDataGrid />
        </Card>
      </Container>
    </>
  );
};

UnapprovedUsers.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <DashboardLayout>{page}</DashboardLayout>; // {/* </AuthGuard> */}
    </>
  );
};

export default UnapprovedUsers;
