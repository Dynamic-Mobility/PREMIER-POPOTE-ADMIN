import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Grid, TextField, Button, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const AtmParams = () => {
  return (
    <Container maxWidth="xl">
      <Typography my={2} fontWeight={"bold"} fontSize={"20px"}>
        AtmParams
      </Typography>
      <Card sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextField sx={{ my: 1 }} fullWidth label="Request Type" />
            <TextField sx={{ my: 1 }} fullWidth label="Transaction Code" />
            <TextField sx={{ my: 1 }} fullWidth label="Machine name" />
            <TextField sx={{ my: 1 }} fullWidth label="As Card" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Channel Id" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Interface Code" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Trx Status" />
            <TextField sx={{ my: 1 }} fullWidth label="As Fee Trx" />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField sx={{ my: 1 }} fullWidth label="Transaction GL" />
            <TextField sx={{ my: 1 }} fullWidth label="Teller Code" />
            <TextField sx={{ my: 1 }} fullWidth label="Processing Code" />
            <TextField sx={{ my: 1 }} fullWidth label="As Check Balance" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Card Present" />
            <TextField sx={{ my: 1 }} fullWidth label="AI POS" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Use Account" />
            <TextField sx={{ my: 1 }} fullWidth label="As fee Trx Process" />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField sx={{ my: 1 }} fullWidth label="Currency code" />
            <TextField sx={{ my: 1 }} fullWidth label="Imal User ID" />
            <TextField sx={{ my: 1 }} fullWidth label="As Posting Type" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Company" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Atm Trx" />
            <TextField sx={{ my: 1 }} fullWidth label="AI Trx Alert" />
            <TextField sx={{ my: 1 }} fullWidth label="As Fee Currency" />
            <TextField sx={{ my: 1 }} fullWidth label="As M Type" />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

AtmParams.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default AtmParams;
