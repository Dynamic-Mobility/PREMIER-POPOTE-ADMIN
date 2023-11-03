import { appName } from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ModernLayout from "../../../components/layouts/modern";
import {useDispatch} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import {useCallback, useEffect} from "react";
import UserRoles from "../../../components/dashboard/roles";
import {getAllRoles} from "../../../slices/dashboard/roles";


const title = "Manage Users";

const ExistingUsersPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();

    const fetchAllRoles = useCallback(async () => {
        await dispatch(getAllRoles(authUser));
    },[]);

    useEffect(() => {
        fetchAllRoles();
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
              <Card sx={{p:1, minHeight: '80vh'}}>
                  <UserRoles/>
              </Card>
          </MKBox>
        </>
      );
};

ExistingUsersPage.getLayout = (page) => (
  // <AuthGuard>
    <ModernLayout>
        {page}
    </ModernLayout>
  // </AuthGuard>
);

export default ExistingUsersPage;
