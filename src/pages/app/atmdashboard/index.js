import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Grid, Container, Box, Typography, Card } from "@mui/material";

export const transactionTypeData = [
  {
    id: 1,
    transactionName: "Mpesa B2C",
    successCount: "100",
    failedCount: "30",
    totalCount: "130",
  },
  {
    id: 2,
    transactionName: "Utility Payments",
    successCount: "150",
    failedCount: "10",
    totalCount: "160",
  },
  {
    id: 3,
    transactionName: "Top Ups",
    successCount: "110",
    failedCount: "40",
    totalCount: "150",
  },
  {
    id: 4,
    transactionName: "C2B Mpesa",
    successCount: "500",
    failedCount: "10",
    totalCount: "510",
  },
  {
    id: 5,
    transactionName: "Pesalink",
    successCount: "600",
    failedCount: "100",
    totalCount: "700",
  },
  {
    id: 6,
    transactionName: "Pesalink to Account",
    successCount: "300",
    failedCount: "50",
    totalCount: "350",
  },
  {
    id: 7,
    transactionName: "Funds Transfer",
    successCount: "200",
    failedCount: "100",
    totalCount: "300",
  },
];

const AtmDashboard = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography fontWeight="bold" fontSize="20px" sx={{ pt: 2 }}>
          ATM Dashboard
        </Typography>
        <Grid container spacing={2} sx={{ py: 1 }}>
          {transactionTypeData.map((data, index) => (
            <Grid item key={index} xs={12} md={3}>
              <Card sx={{ px: 3, py: 2 }}>
                <Typography>{data?.transactionName}</Typography>
                <Typography
                  sx={{ fontSize: "13px", borderBottom: "1px solid gray" }}
                >
                  Number of Transactions
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ color: "#1B4FA2" }}>
                    <Typography sx={{ fontSize: "12px" }}>Total</Typography>
                    <Typography sx={{ fontSize: "12px" }}>{data?.totalCount}</Typography>
                  </Box>
                  <Box sx={{ color: "#008000", fontSize: "12px" }}>
                    <Typography sx={{ fontSize: "12px" }}>Success</Typography>
                    <Typography sx={{ fontSize: "12px" }}>{data.successCount}</Typography>
                  </Box>
                  <Box sx={{ color: "#FF0000", fontSize: "12px" }}>
                    <Typography sx={{ fontSize: "12px" }}>Failed</Typography>
                    <Typography sx={{ fontSize: "12px" }}>{data.failedCount}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

AtmDashboard.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default AtmDashboard;
