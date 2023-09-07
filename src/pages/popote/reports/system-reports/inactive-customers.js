import React from "react";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { Container, Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import ModernLayout from "../../../../components/layouts/modern";
import Head from "next/head";
import InactiveCustomersDataGrid from "../../../../components/popote/reports/system-reports/inactive-customers-datagrid";

const title = "In Active Customers";
const InactiveCustomers = () => {
  return (
    <>
      <Head>{title}</Head>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <MKTypography fontWeight={"bold"} fontSize={"20px"}>
          {title}
        </MKTypography>
        <Card sx={{ p: 2 }}>
          <InactiveCustomersDataGrid />
        </Card>
      </Container>
    </>
  );
};

InactiveCustomers.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default InactiveCustomers;
