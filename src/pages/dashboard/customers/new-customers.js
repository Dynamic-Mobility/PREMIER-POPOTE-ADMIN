import React, {useEffect, useState} from "react";
import {Card, Grid} from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import NewCustomersDatagrid from "../../../components/dashboard/customers/customer-datagrids/new-customers-datagrid";
import ModernLayout from "../../../components/layouts/modern";
import MKBox from "../../../components/@mui-components/box";
import Head from "next/head";
import {useDispatch, useSelector} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import {getUnapprovedCustomers} from "../../../slices/dashboard/customers";
import CustomerActionsButton from "../../../components/dashboard/customers/filters/customer-actions-button";
import {AuthGuard} from "../../../hocs/auth-guard";
import {PAGES_PATHS} from "../../../utils/constants";
import RoleBasedGuard from "../../../hocs/role-based-guard";

const title = "Approve New Customers";
const NewCustomersPage = () => {
  const initialFilters = {
    name: "",
    idnumber: "",
    phonenumber: "",
    cifNumber: "",
    email: "",
  }
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { unapprovedCustomers, pageSize, currentPage} = useSelector(( { customers }) => customers);
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
    await dispatch(getUnapprovedCustomers(authUser,values ))
  }

  const handleOnSearch = async () => {
    await fetchUnapprovedCustomers();
  }

  const fetchUnapprovedCustomers = async () => {
    const values = {
      ...filters,
      pageSize,
      pageNumber: currentPage,
    }
    await dispatch(getUnapprovedCustomers(authUser,values ))
  }


  useEffect(() => {
    fetchUnapprovedCustomers();
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
          <NewCustomersDatagrid
              data={unapprovedCustomers} 
              onRefresh={fetchUnapprovedCustomers} 
          />
        </Card>
      </MKBox>

    </>
  );
};

NewCustomersPage.getLayout = (page) => {
  return (
    <>
      <AuthGuard>
        <ModernLayout>
          <RoleBasedGuard path={PAGES_PATHS.APPROVE_NEW_CUSTOMERS} page={true}>
            {page}
          </RoleBasedGuard>
        </ModernLayout>
      </AuthGuard> 
    </>
  );
};

export default NewCustomersPage;
