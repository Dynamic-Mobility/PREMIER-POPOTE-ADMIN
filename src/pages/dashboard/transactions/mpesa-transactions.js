import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container, Typography,Card } from "@mui/material";
import MpesaTransactionDataGrid from "../../../components/dashboard/transactions/mpesa-transactions-data-grid";

const MpesaTransactions = () => {
  return (
    <>
      <Container>
        <Typography fontWeight={"bold"} fontSize={"20px"} sx={{ my: 2 }}>
          Mpesa Transactions
        </Typography>
        <Card sx={{p:2}}>
          <MpesaTransactionDataGrid />
        </Card>
      </Container>
    </>
  );
};

MpesaTransactions.getLayout = (page) => (
  // <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //  </AuthGuard>
);

export default MpesaTransactions;
