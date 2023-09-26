import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Typography, Card, Container } from "@mui/material";
import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";
import MKTypography from "../../../components/@mui-components/typography";
import ModernLayout from "../../../components/layouts/modern";



const Users = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{py:2}}>
        <MKTypography sx={{my:1}} fontWeight={"semibold"} fontSize={"20px"}>Existing Users</MKTypography>
        <Card sx={{ p: 3 }}>
          <UsersDataGrid />
        </Card>
      </Container>
    </>
  );
};

Users.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <ModernLayout>{page}</ModernLayout>; // {/* </AuthGuard> */}
    </>
  );
};

export default Users;
