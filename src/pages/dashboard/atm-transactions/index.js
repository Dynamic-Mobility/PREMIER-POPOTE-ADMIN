import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Card } from "@mui/material";
import AtmDataGrid from "../../../components/dashboard/atm";

const AtmTransactions = () => {
  return (
    <Container>
      <Typography m={2} variant="h6">
        ATM Transactions
      </Typography>
      <Card sx={{ p: 2, m: 2 }}>
        <AtmDataGrid />
      </Card>
    </Container>
  );
};

AtmTransactions.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default AtmTransactions;
