import {appName, PAGES_PATHS} from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";

import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import {Card} from "@mui/material";
import ModernLayout from "../../../components/layouts/modern";
import GlobalLimits from "../../../components/dashboard/limits/global-limits";
import {useDispatch} from "../../../store";
import React, {useCallback, useEffect} from "react";
import {getTransactionTypes} from "../../../slices/dashboard/settings";
import {useAuth} from "../../../hooks/use-auth";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";


const title = "Global Limits";

const GlobalLimitsPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();

    const fetchTransactionTypes = useCallback(async () => {
        await dispatch(getTransactionTypes(authUser));
    },[authUser?.user]);

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
    <AuthGuard>
        <ModernLayout>
            <RoleBasedGuard path={PAGES_PATHS.GLOBAL_LIMITS} page={true}>
                {page}
            </RoleBasedGuard>
        </ModernLayout>
    </AuthGuard>
);

export default GlobalLimitsPage;
