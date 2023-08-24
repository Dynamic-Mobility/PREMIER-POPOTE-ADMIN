import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography} from "@mui/material";
import ApproveCustomerDataGrid from "../../../components/dashboard/customers/approve-customer-data-grid";


// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const ApproveCustomers = () => {
  return (
    <Container>
      <Typography my={2} fontSize={'18px'} color="primary" fontWeight={'bold'}>
         Approve Customers
      </Typography>
      <ApproveCustomerDataGrid />
    </Container>
  );
};

ApproveCustomers.getLayout = (page) => (
//   <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
//   </AuthGuard>
);

export default ApproveCustomers;
