import { appName } from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import {Card} from "@mui/material";
import ModernLayout from "../../../components/layouts/modern";
import PersonalizedLimits from "../../../components/dashboard/limits/personalized-limits";


const title = "Personalized Limits";

const PersonalizedLimitsPage = () => {
  return (
    <>
      <Head>
        <title>{title} | {appName}</title>
      </Head>
      <MKBox
        //component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
            px:2,
        }}
      >
          <MKBox sx={{ mb: 2 }}>
              <Grid container justifyContent="space-between" spacing={3}>
                  <Grid item>
                      <MKTypography variant="h5">{title}</MKTypography>
                  </Grid>
              </Grid>
          </MKBox>
          <Card sx={{p:1, minHeight: '50vh'}}>
              <PersonalizedLimits/>
          </Card>
      </MKBox>
    </>
  );
};

PersonalizedLimitsPage.getLayout = (page) => (
  // <AuthGuard>
    <ModernLayout>
        {page}
    </ModernLayout>
  // </AuthGuard>
);

export default PersonalizedLimitsPage;
