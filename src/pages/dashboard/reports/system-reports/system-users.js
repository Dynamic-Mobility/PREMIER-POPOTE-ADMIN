import React from "react";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { Container, Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import SystemUsersDataGrid from "../../../../components/dashboard/reports/system-reports/system-users-datagrid";
import ModernLayout from "../../../../components/layouts/modern";

const SystemUsers = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <MKTypography fontWeight={"bold"} fontSize={"20px"}>
        System Users
      </MKTypography>
      <Card sx={{ p: 2 }}>
        <SystemUsersDataGrid />
      </Card>
    </Container>
  );
};

SystemUsers.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default SystemUsers;
