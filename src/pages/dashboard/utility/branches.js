import { appName } from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ModernLayout from "../../../components/layouts/modern";
import {useDispatch, useSelector} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import {useCallback, useEffect} from "react";
import {getAllBranches} from "../../../slices/dashboard/utils";
import BranchesDatagrid from "../../../components/dashboard/branches/branches-datagrid";
import CreateBranchDialog from "../../../components/dashboard/branches/create-branch-dialog";


const title = "Manage Branches";

const ManageBranchesPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();
    const { branches } = useSelector(({ utils }) => utils);

    const fetchAllBranches = useCallback(async () => {
        await dispatch(getAllBranches(authUser));
    },[]);


    useEffect(() => {
        fetchAllBranches();
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
                      <Grid item>
                          <CreateBranchDialog/>
                      </Grid>
                  </Grid>
              </MKBox>
              <Card sx={{p:1}}>
                  <BranchesDatagrid data={branches} onRefresh={fetchAllBranches}/>
              </Card>
          </MKBox>
        </>
      );
};

ManageBranchesPage.getLayout = (page) => (
  // <AuthGuard>
    <ModernLayout>
        {page}
    </ModernLayout>
  // </AuthGuard>
);

export default ManageBranchesPage;
