import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Card, Container, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import CustomersDataGrid from "../../../components/popote/customers/customers-data-grid";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import CustomerActionsButton from "../../../components/popote/customers/customer-actions-button";
import MKBox from "../../../components/@mui-components/box";

const title = "Existing Customers";

const Customers = () => {
  return (
    <>
      <Head>{title}</Head>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <MKBox sx={{mb:2}}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              <MKTypography variant="h5">{title}</MKTypography>
            </Grid>
            <Grid item>
              <CustomerActionsButton />
            </Grid>
          </Grid>
        </MKBox>
        <Card sx={{ p: 3 }}>
          <CustomersDataGrid />
        </Card>
      </Container>
    </>
  );
};

Customers.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <ModernLayout>{page}</ModernLayout>; // {/* </AuthGuard> */}
    </>
  );
};

export default Customers;
