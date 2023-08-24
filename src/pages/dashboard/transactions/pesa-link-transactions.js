import React, { useState } from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container, Box } from "@mui/system";
import { Typography } from "@mui/material";
import PesaLinkTransactionDatagrid from "../../../components/dashboard/transactions/pesa-linkTransaction-data-grid";
import ReportsDatagrid from "../../../components/dashboard/transactions/reports-data-grid";

// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const PesaLinkTransactions = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Container>
      <Typography my={2} fontWeight={"bold"} color="primary" fontSize={"20px"}>
        Pesa Link Transactions
      </Typography>
      <Box sx={{ display: "flex", gap: 4, justifyContent: "space-around",my:2 }}>
        <Typography sx={{cursor:'pointer',borderBottom: currentTab === 0 ? "2px solid #002E5E" : 'none',width:'40%',textAlign:'center',textTransform:"uppercase"}} fontWeight={"bold"} color="primary" onClick={()=> setCurrentTab(0)}>Live Transfers</Typography>
        <Typography sx={{cursor:'pointer',borderBottom: currentTab === 1 ? "2px solid #002E5E" : "none",width:'40%',textAlign:'center',textTransform:'uppercase'}}fontWeight={"bold"} color="primary" onClick={()=> setCurrentTab(1)}>Reports</Typography>
      </Box>
      {currentTab === 0 && (
        <>
          <PesaLinkTransactionDatagrid />
        </>
      )}
      {currentTab === 1 && (
        <>
          <ReportsDatagrid />
        </>
      )}
    </Container>
  );
};

PesaLinkTransactions.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default PesaLinkTransactions;
