import React from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography} from "@mui/material";
import PartnerSettingsDataGrid from "../../../components/dashboard/settings/partnerSettings-data-grid";


// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const PartnerSettings = () => {
  return (
    <Container>
      <Typography my={2} mx={2} variant="h6" fontSize={'20px'}>
        Partner Settings
      </Typography>
      <PartnerSettingsDataGrid />
    </Container>
  );
};

PartnerSettings.getLayout = (page) => (
//   <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
//   </AuthGuard>
);

export default PartnerSettings;