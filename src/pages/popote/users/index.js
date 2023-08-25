import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Typography, Card, Container } from "@mui/material";
import UsersDataGrid from "../../../components/popote/users/users-data-grid";
import MKTypography from "../../../components/@mui-components/typography";



const Users = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{py:2}}>
        <MKTypography sx={{my:1}} fontWeight={"semibold"} fontSize={"20px"}>User Management</MKTypography>
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
      <DashboardLayout>{page}</DashboardLayout>; // {/* </AuthGuard> */}
    </>
  );
};

export default Users;
