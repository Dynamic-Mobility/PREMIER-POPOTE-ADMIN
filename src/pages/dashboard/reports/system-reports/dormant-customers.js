import React from "react";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { Container, Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import DormantCustomersDataGrid from "../../../../components/dashboard/reports/system-reports/dormant-customers-datagrid";
import ModernLayout from "../../../../components/layouts/modern";

const DormantCustomers = () => {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <MKTypography fontWeight={"bold"} fontSize={"20px"}>
        Dormant Customers
      </MKTypography>
      <Card sx={{ p: 2 }}>
        <DormantCustomersDataGrid />
      </Card>
    </Container>
  );
};

DormantCustomers.getLayout = (page) => (
  <ModernLayout>{page}</ModernLayout>
);

export default DormantCustomers;
