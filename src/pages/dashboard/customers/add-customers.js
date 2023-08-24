import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container, Box } from "@mui/system";
import { Typography, TextField, Grid, Card, Button } from "@mui/material";

// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const AddCustomers = () => {
  return (
    <Container>
      <Typography my={2} fontWeight={"bold"} color="primary" fontSize={"18px"}>
        Add Customer
      </Typography>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Typography sx={{fontSize:'14px'}} color="primary">
              Enter the account number below to get customer details.
            </Typography>
            <TextField fullWidth label="Account Number" />
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography fontWeight={"bold"} color="primary" fontSize="20px">
              Account Details
            </Typography>
            <TextField sx={{ my: 1 }} fullWidth label="Customer Name" />
            <TextField sx={{ my: 1 }} fullWidth label="Account Number" />
            <TextField sx={{ my: 1 }} fullWidth label="Currency Code" />
            <TextField sx={{ my: 1 }} fullWidth label="Phone Number" />
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
              <Button color="primary" variant="contained" size="small">
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
      {/* <UsersDataGrid /> */}
    </Container>
  );
};

AddCustomers.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default AddCustomers;
