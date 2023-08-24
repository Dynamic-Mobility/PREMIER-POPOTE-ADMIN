import React from "react";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { AuthGuard } from "../../../../hocs/auth-guard";
import { Typography, Card, Container } from "@mui/material";

const Users = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography>Create Users</Typography>
        </Card>
      </Container>
    </>
  );
};

Users.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
        <DashboardLayout>{page}</DashboardLayout>; //{" "}
      {/* </AuthGuard> */}
    </>
  );
};

export default Users;
