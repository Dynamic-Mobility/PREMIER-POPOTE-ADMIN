import React from 'react'
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import { AuthGuard } from "../../../hocs/auth-guard";
import EditedUsersDataGrid from '../../../components/popote/users/edited-users-datagrid';



const EditedUsers = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
        <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
          Approve Edited Users
        </MKTypography>
        <Card sx={{ p: 3 }}>
            <EditedUsersDataGrid />
        </Card>
      </Container>
  )
}

EditedUsers.getLayout = (page) => {
    return (
      <>
        {/* <AuthGuard> */}
        <DashboardLayout>{page}</DashboardLayout>; 
        {/* </AuthGuard> */}
      </>
    );
  };

export default EditedUsers