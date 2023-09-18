import React from "react";
import { Container, Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import ModernLayout from "../../../../components/layouts/modern";
import Head from "next/head";
import ActiveCustomersDataGrid from "../../../../components/popote/reports/system-reports/active-customers-datagrid";

const title = "Active Customers";
const ActiveCustomers = () => {
  return (
    <>
    <Head>{title}</Head>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <MKTypography fontWeight={"bold"} fontSize={"20px"}>
          {title}
        </MKTypography>
        <Card sx={{ p: 2 }}>
            <ActiveCustomersDataGrid />
        </Card>
      </Container>
    </>
  );
};

ActiveCustomers.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default ActiveCustomers;
