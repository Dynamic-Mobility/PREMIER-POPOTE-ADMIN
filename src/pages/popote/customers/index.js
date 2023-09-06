import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import CustomersDataGrid from "../../../components/popote/customers/customers-data-grid";
import ModernLayout from "../../../components/layouts/modern";


const Customers = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
          Customer Management
        </MKTypography>
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
