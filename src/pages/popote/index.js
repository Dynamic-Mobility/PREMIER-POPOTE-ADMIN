// import React from "react";
// import { DashboardLayout } from "../../components/layouts/dashboard";
// import MKTypography from "../../components/@mui-components/typography";
// import { Container, Grid, Card } from "@mui/material";
// import ModernLayout from '../../components/layouts/modern'



// const Dashboard = () => {
//   return (
//     <>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <MKTypography fontWeight="bold" fontSize="20px">
//           Dashboard
//         </MKTypography>
//         <Grid container spacing={2} sx={{my:1}}>
//           <Grid item md={3} xs={12}>
//             <Card sx={{p:2}}>Dashboard</Card>
//           </Grid>
//           <Grid item md={3} xs={12}>
//             <Card sx={{p:2}}>Dashboard</Card>
//           </Grid>
//           <Grid item md={3} xs={12}>
//             <Card sx={{p:2}}>Dashboard</Card>
//           </Grid>
//           <Grid item md={3} xs={12}>
//             <Card sx={{p:2}}>Dashboard</Card>
//           </Grid>
//         </Grid>
//         <Grid container spacing={2} sx={{my:1}}>
//           <Grid item md={3} xs={12}>
//             <Card sx={{p:2}}>Dashboard</Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// Dashboard.getLayout = (pages) => <ModernLayout>{pages}</ModernLayout>;

// export default Dashboard;








// import Dashboard from "../../components/dashboard";
import Dashboard from "../../components/popote";
import { appName } from "../../utils/constants";
import MKTypography from "../../components/@mui-components/typography";
import Head from "next/head";
import Container from "@mui/material/Container";
import MKBox from "../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import { AuthGuard } from "../../hocs/auth-guard";
import { DashboardLayout } from "../../components/layouts/dashboard";
import { useMounted } from "../../hooks/use-mounted";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "../../store";
import { useAuth } from "../../hooks/use-auth";
import { getDashboardData } from "../../slices/dashboard";

const DashboardPage = () => {
  const isMounted = useMounted();
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { data } = useSelector(({ dashboard }) => dashboard);

  const fetchDashboardData = async () => {
    try {
      await dispatch(getDashboardData(authUser));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
        <Container maxWidth="xl">
          <MKBox sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <MKTypography variant="h4">Dashboard</MKTypography>
              </Grid>
            </Grid>
          </MKBox>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <Dashboard data={data} />
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
};

DashboardPage.getLayout = (page) => (
  // <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  // </AuthGuard>
);

export default DashboardPage;
