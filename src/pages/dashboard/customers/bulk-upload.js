import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography,Card,Grid,TextField} from "@mui/material";


// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const BulkUpload = () => {
  return (
    <Container>
      <Typography my={2} fontSize={"20px"} fontWeight="bold" color="primary">
         Bulk Upload
      </Typography>
      <Card sx={{p:2}}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <TextField label="clients" fullWidth  />
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography>Display an upload Dropzone Area</Typography>
          </Grid>
        </Grid>
      </Card>
      {/* <UsersDataGrid /> */}
    </Container>
  );
};

BulkUpload.getLayout = (page) => (
//   <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
//   </AuthGuard>
);

export default BulkUpload;
