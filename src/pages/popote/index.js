import { appName } from "../../utils/constants";
import MKTypography from "../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import ModernLayout from '../../components/layouts/modern';
import DashboardCards from "../../components/popote/dashboard-cards";
import DashboardSummary from "../../components/popote/dashboard-summary";

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard | {appName}</title>
      </Head>
      <MKBox
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <MKBox sx={{px:2}}>
          <MKBox sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <MKTypography variant="h4">Dashboard</MKTypography>
              </Grid>
            </Grid>
          </MKBox>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <DashboardCards />
            </Grid>
              <Grid item md={9} xs={12}>
               <DashboardSummary/>
              </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </>
  );
};

DashboardPage.getLayout = (page) => (
  // <AuthGuard>
    <ModernLayout>{page}</ModernLayout>
  // </AuthGuard>
);

export default DashboardPage;
