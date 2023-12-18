import {appName, PAGE_PERMISSIONS, PAGES_PATHS} from "../../utils/constants";
import MKTypography from "../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import ModernLayout from '../../components/layouts/modern';
import DashboardCards from "../../components/dashboard/dashboard-cards";
import DashboardSummary from "../../components/dashboard/dashboard-summary";
import {AuthGuard} from "../../hocs/auth-guard";
import RoleBasedGuard from "../../hocs/role-based-guard";


const title = "Dashboard";
const DashboardPage = () => {

  return (
    <>
      <Head>
        <title>{title} | {appName}</title>
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
                <MKTypography variant="h4">{title}</MKTypography>
              </Grid>
            </Grid>
          </MKBox>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <DashboardCards />
            </Grid>
              <Grid item md={12} sm={12} xs={12}>
               <DashboardSummary/>
              </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </>
  );
};

DashboardPage.getLayout = (page) => (
  <AuthGuard>
      <ModernLayout>
          <RoleBasedGuard path={PAGES_PATHS.DASHBOARD} page={true}>
              {page}
          </RoleBasedGuard>
      </ModernLayout>
  </AuthGuard>
);

export default DashboardPage;
