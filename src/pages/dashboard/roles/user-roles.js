import {appName, PAGES_PATHS} from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ModernLayout from "../../../components/layouts/modern";
import {useDispatch} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import React, {useCallback, useEffect} from "react";
import UserRoles from "../../../components/dashboard/roles";
import {getAllMenus, getAllRoles} from "../../../slices/dashboard/roles";
import {useMounted} from "../../../hooks/use-mounted";
import RefreshButton from "../../../components/@dmt-components/refresh-button";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {AuthGuard} from "../../../hocs/auth-guard";


const title = "User Roles";

const RolesPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();
    const isMounted = useMounted();

    const fetchAllRoles = useCallback(async () => {
        if (isMounted()){
            await dispatch(getAllRoles(authUser));
        }

    },[isMounted]);

    const fetchAllMenus = useCallback(async () => {
        if (isMounted()){
            await dispatch(getAllMenus(authUser));
        }

    },[isMounted]);


    useEffect(() => {
        fetchAllRoles();
        fetchAllMenus();
    },[isMounted]);
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
                      <Grid item>
                          <RefreshButton onRefresh={fetchAllRoles}/>
                      </Grid>
                  </Grid>
              </MKBox>
              <Card sx={{p:1, minHeight: '80vh'}}>
                  <UserRoles/>
              </Card>
          </MKBox>
        </>
      );
};

RolesPage.getLayout = (page) => (
    <AuthGuard>
        <ModernLayout>
            <RoleBasedGuard path={PAGES_PATHS.USER_ROLES} page={true}>
                {page}
            </RoleBasedGuard>
        </ModernLayout>
    </AuthGuard>
);

export default RolesPage;
