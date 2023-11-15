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
import {getAllDepartments} from "../../../slices/dashboard/utils";
import DepartmentsDatagrid from "../../../components/dashboard/departments/departments-datagrid";
import CreateDepartmentDialog from "../../../components/dashboard/departments/create-department-dialog";


const title = "Manage Departments";

const ManageDepartmentsPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();
    const { departments } = useSelector(({ utils }) => utils);

    const fetchAllDepartments = useCallback(async () => {
        await dispatch(getAllDepartments(authUser));
    },[]);


    useEffect(() => {
        fetchAllDepartments();
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
                          <CreateDepartmentDialog/>
                      </Grid>
                  </Grid>
              </MKBox>
              <Card sx={{p:1}}>
                  <DepartmentsDatagrid data={departments} onRefresh={fetchAllDepartments}/>
              </Card>
          </MKBox>
        </>
      );
};

ManageDepartmentsPage.getLayout = (page) => (
  // <AuthGuard>
    <ModernLayout>
        {page}
    </ModernLayout>
  // </AuthGuard>
);

export default ManageDepartmentsPage;
