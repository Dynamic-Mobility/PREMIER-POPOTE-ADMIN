import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Typography, Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import UnapprovedDataGrid from "../../../components/popote/users/unapproved-datagrid";
import ModernLayout from "../../../components/layouts/modern";
import MKBox from "../../../components/@mui-components/box";


const UnapprovedUsers = () => {
  return (
    <>
      <MKBox sx={{p:2}}>
        <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
          Unapproved Users
        </MKTypography>
        <Card sx={{ p: 3 }}>
          <UnapprovedDataGrid />
        </Card>
      </MKBox>
    </>
  );
};

UnapprovedUsers.getLayout = (page) => {
  return (
    <>
    
      <ModernLayout>{page}</ModernLayout>; 
    </>
  );
};

export default UnapprovedUsers;
