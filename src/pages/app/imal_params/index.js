import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Grid, TextField, Button, Card } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const MobileTrn = () => {
  return (
    <Container>
      <Typography my={2} fontWeight={"bold"} fontSize={"20px"}>
        MobileTrn
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Card sx={{ p: 2 }}>
            <Button variant="contained" size="small" color="primary">
              <AddIcon sx={{fontSize:'2rem'}} />
              Add Trn Codes
            </Button>
            <TextField fullWidth size="small" label="Search" sx={{ my: 2 }} />
            <Typography fontSize={"14px"} fontWeight={"bold"}>
              0 Transaction Parameters
            </Typography>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField sx={{my:1}} fullWidth size="small" label="Request Type" />
                <TextField sx={{my:1}} fullWidth size="small" label="Transaction Code" />
                <TextField sx={{my:1}} fullWidth size="small" label="Machine name" />
                <TextField sx={{my:1}} fullWidth size="small" label="As Card" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Channel Id" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Interface Code" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Trx Status" />
                <TextField sx={{my:1}} fullWidth size="small" label="As Fee Trx" />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField sx={{my:1}} fullWidth size="small" label="Transaction GL" />
                <TextField sx={{my:1}} fullWidth size="small" label="Teller Code" />
                <TextField sx={{my:1}} fullWidth size="small" label="Processing Code" />
                <TextField sx={{my:1}} fullWidth size="small" label="As Check Balance" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Card Present" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI POS" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Use Account" />
                <TextField sx={{my:1}} fullWidth size="small" label="As fee Trx Process" />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField sx={{my:1}} fullWidth size="small" label="Currency code" />
                <TextField sx={{my:1}} fullWidth size="small" label="Imal User ID" />
                <TextField sx={{my:1}} fullWidth size="small" label="As Posting Type" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Company" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Atm Trx" />
                <TextField sx={{my:1}} fullWidth size="small" label="AI Trx Alert" />
                <TextField sx={{my:1}} fullWidth size="small" label="As Fee Currency" />
                <TextField sx={{my:1}} fullWidth size="small" label="As M Type" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

MobileTrn.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default MobileTrn;
