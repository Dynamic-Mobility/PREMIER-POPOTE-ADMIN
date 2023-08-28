import React from "react";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { Container,Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import FailedRegistrationDataGrid from "../../../../components/popote/reports/system-reports/failed-registration-datagrid";

const FailedRegistration = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <MKTypography fontWeight={"bold"} fontSize={"20px"}>
        Failed Registrations
      </MKTypography>
      <Card sx={{p:2}}>
        <FailedRegistrationDataGrid />
      </Card>
    </Container>
  );
};

FailedRegistration.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FailedRegistration;
