import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import ApiUsersDataGrid from "../../../components/dashboard/api-users/api-users-data-grid";
import { Container, Typography, Box } from "@mui/material";

const AllApiUsers = () => {
  return (
    <>
      <Container>
        <Box sx={{py:2}}>
          <Typography fontWeight={"bold"} fontSize={'20px'} color="primary">
            Api Users
          </Typography>
        </Box>
        <ApiUsersDataGrid />
      </Container>
    </>
  );
};

AllApiUsers.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default AllApiUsers;
