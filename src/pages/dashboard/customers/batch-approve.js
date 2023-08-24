import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography} from "@mui/material";
import BatchApproveDataGrid from "../../../components/dashboard/customers/batch-approve-data-grid";


// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const BatchApprove = () => {
  return (
    <Container>
      <Typography my={2} fontWeight="bold" fontSize={'18px'} color="primary">
         Batch Approve
      </Typography>
      <BatchApproveDataGrid />
    </Container>
  );
};

BatchApprove.getLayout = (page) => (
//   <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
//   </AuthGuard>
);

export default BatchApprove;
