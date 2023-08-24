import React from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography,Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { useEffect } from "react";
import AtmTransactionDataGrid from "../../../components/dashboard/transactions/atm-transaction-data-grid";


const ATMTransactions = () => {

  return (
    <Container>
      <Typography m={2} variant="h6">
        ATM Transactions
      </Typography>
      <Card sx={{ p: 2, m: 2 }}>
        <AtmTransactionDataGrid />
      </Card>
    </Container>
  );
};

ATMTransactions.getLayout = (page) => (
  // <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //  </AuthGuard>
);

export default ATMTransactions;
