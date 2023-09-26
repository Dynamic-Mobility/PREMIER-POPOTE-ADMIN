import React from "react";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { Container,Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import SystemReportDataGrid from "../../../../components/dashboard/reports/system-reports";
import ModernLayout from "../../../../components/layouts/modern";

const SystemReports = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <MKTypography fontWeight={"bold"} fontSize={"20px"}>
        System Reports
      </MKTypography>
      <Card sx={{p:2}}>
        <SystemReportDataGrid />
      </Card>
    </Container>
  );
};

SystemReports.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default SystemReports;
