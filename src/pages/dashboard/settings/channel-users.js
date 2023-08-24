import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography} from "@mui/material";
import ChannelUsersDataGrid from "../../../components/dashboard/settings/channel-users-data-grid";


// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const ChannelUsers = () => {
  return (
    <Container>
      <Typography my={2} mx={2} variant="h6" fontSize={'20px'}>
        Channel Users
      </Typography>
      <ChannelUsersDataGrid />
    </Container>
  );
};

ChannelUsers.getLayout = (page) => (
//   <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
//   </AuthGuard>
);

export default ChannelUsers;
