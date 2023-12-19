import {appName, PAGES_PATHS} from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ModernLayout from "../../../components/layouts/modern";
import {useDispatch, useSelector} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import React, {useCallback, useEffect} from "react";
import {getAllUnApprovedUsers} from "../../../slices/dashboard/users";
import {ButtonGroup} from "@mui/material";
import RefreshButton from "../../../components/@dmt-components/refresh-button";
import UsersApprovalDatagrid from "../../../components/dashboard/users/users-approval-datagrid";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";


const title = "Approve Users";

const ApproveUsersPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();
    const {unapprovedUsers } = useSelector(({ users }) => users);

    const fetchUsers = useCallback(async () => {
        await dispatch(getAllUnApprovedUsers(authUser));
    },[authUser?.user]);

    useEffect(() => {
        fetchUsers();
    },[]);
      return (
        <>
          <Head>
            <title>{title} | {appName}</title>
          </Head>
          <MKBox
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
                          <ButtonGroup
                              fullWidth
                              variant="contained"
                              aria-label="vertical outlined button group"
                          >
                              <RefreshButton onRefresh={fetchUsers}/>
                          </ButtonGroup>
                      </Grid>
                  </Grid>
              </MKBox>
              <Card sx={{p:1, minHeight: '80vh'}}>
                  <UsersApprovalDatagrid data={unapprovedUsers} onRefresh={fetchUsers}/>
              </Card>
          </MKBox>
        </>
      );
};

ApproveUsersPage.getLayout = (page) => (
    <AuthGuard>
        <ModernLayout>
            <RoleBasedGuard path={PAGES_PATHS.APPROVE_USERS} page={true}>
                {page}
            </RoleBasedGuard>
        </ModernLayout>
    </AuthGuard>
);

export default ApproveUsersPage;
