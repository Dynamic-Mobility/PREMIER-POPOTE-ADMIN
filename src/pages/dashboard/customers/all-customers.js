import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Card } from "@mui/material";
import CustomersDataGrid from "../../../components/dashboard/customers/customer-data-grid";


const AllCustomers = () => {
  return (
    <Container>
      <Typography my={2} fontWeight={'bold'} fontSize="18px" color="primary">
        All Customers
      </Typography>
      <Card sx={{ p: 2, m: 2 }}>
        <CustomersDataGrid />
      </Card>
    </Container>
  );
};

AllCustomers.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default AllCustomers;
