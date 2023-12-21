import React, {useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import ExistingCustomersDatagrid from "../../../components/dashboard/customers/customer-datagrids/existing-customers-datagrid";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import CustomerActionsButton from "../../../components/dashboard/customers/filters/customer-actions-button";
import MKBox from "../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../store";
import {getAllCustomers, getUnblockedCustomers} from "../../../slices/dashboard/customers";
import {useAuth} from "../../../hooks/use-auth";
import UnblockedCustomersDatagrid
  from "../../../components/dashboard/customers/customer-datagrids/unblocked-customers-datagrid";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {PAGES_PATHS} from "../../../utils/constants";

const title = "Approve Unblocked Customers";

const  UnblockedCustomersPage = () => {
  const initialFilters = {
    name: "",
    idnumber: "",
    phonenumber: "",
    cifNumber: "",
    email: "",
  }
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { unblockedCustomers, pageSize, currentPage} = useSelector(( { customers }) => customers);
  const authUser = useAuth();

  const handleOnChangeFilters = values => {
    setFilters(values);
  }

  const handleOnResetFilters = async () => {
    setFilters(initialFilters);
    const values = {
      ...initialFilters,
      pageSize,
      pageNumber: currentPage,
    }
    await dispatch(getUnblockedCustomers(authUser,values ))
  }

  const handleOnSearch = async () => {
    await fetchCustomers();
  }

  const fetchCustomers = async () => {
    const values = {
      ...filters,
      pageSize,
      pageNumber: currentPage,

   }
    await dispatch(getUnblockedCustomers(authUser,values ))
  }


  useEffect(() => {
    fetchCustomers();
  }, [])

  return (
    <>
      <Head>{title}</Head>
        <MKBox
            component={'main'}
            sx={{
              flexGrow: 1,
              pt: 2,
              px:2,
            }}
        >
          <MKBox sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <MKTypography variant="h5">{title}</MKTypography>
            </Grid>
            <Grid item>
              <CustomerActionsButton {...{
                filters,
                onChangeFilters: handleOnChangeFilters,
                onResetFilters: handleOnResetFilters,
                onSearch: handleOnSearch
              }} />
            </Grid>
          </Grid>
          </MKBox>
          <Card sx={{ p: 1 }}>
            <UnblockedCustomersDatagrid data={unblockedCustomers} onRefresh={fetchCustomers} />
          </Card>
        </MKBox>

    </>
  );
};

UnblockedCustomersPage.getLayout = (page) => {
  return (
    <>
      <AuthGuard>
        <ModernLayout>
          <RoleBasedGuard path={PAGES_PATHS.APPROVE_UNBLOCKED_CUSTOMERS} page={true}>
            {page}
          </RoleBasedGuard>
        </ModernLayout>
      </AuthGuard>
    </>
  );
};

export default UnblockedCustomersPage;
