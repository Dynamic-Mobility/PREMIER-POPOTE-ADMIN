import React from "react";
import { DashboardLayout } from "../../components/layouts/dashboard";
import MKTypography from "../../components/@mui-components/typography";
import { Container, Grid, Card } from "@mui/material";
import MKBox from "../../components/@mui-components/box";

const Dashboard = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <MKTypography fontWeight="bold" fontSize="20px">
          Dashboard
        </MKTypography>
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <Card sx={{p:2}}>Dashboard</Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card sx={{p:2}}>Dashboard</Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card sx={{p:2}}>Dashboard</Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card sx={{p:2}}>Dashboard</Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{my:1}}>
          <Grid item md={3} xs={12}>
            <Card sx={{p:2}}>Dashboard</Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Dashboard.getLayout = (pages) => <DashboardLayout>{pages}</DashboardLayout>;

export default Dashboard;
