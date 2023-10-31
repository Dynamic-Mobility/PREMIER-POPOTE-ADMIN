import { appName } from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";

import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import {Card} from "@mui/material";
import ModernLayout from "../../../components/layouts/modern";
import GlobalLimits from "../../../components/dashboard/limits/global-limits";
import {useDispatch} from "../../../store";
import {useCallback, useEffect} from "react";
import {getTransactionTypes} from "../../../slices/popote/settings";
import {useAuth} from "../../../hooks/use-auth";


const title = "Global Limits";

const GlobalLimitsPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();

    const fetchTransactionTypes = useCallback(async () => {
        await dispatch(getTransactionTypes(authUser));
    },[]);

    useEffect(() => {
        fetchTransactionTypes();
    },[]);


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
              <GlobalLimits/>
          </Card>
      </MKBox>
    </>
  );
};

GlobalLimitsPage.getLayout = (page) => (
  // <AuthGuard>
    <ModernLayout>
        {page}
    </ModernLayout>
  // </AuthGuard>
);

export default GlobalLimitsPage;
