import React, {useEffect, useState} from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import {Card, Container, Grid} from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import { AuthGuard } from "../../../hocs/auth-guard";
import RegistrationsDatagrid from "../../../components/dashboard/customers/registrations-datagrid";
import ModernLayout from "../../../components/layouts/modern";
import MKBox from "../../../components/@mui-components/box";
import Head from "next/head";
import {useDispatch, useSelector} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import {getUnapprovedCustomers} from "../../../slices/popote/customers";
import CustomerActionsButton from "../../../components/dashboard/customers/filters/customer-actions-button";
import CustomersDataGrid from "../../../components/dashboard/customers/customers-data-grid";

const title = "Approve Registrations";
const Registrations = () => {
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
          <Grid container justifyContent="space-between" spacing={2}>
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
          <RegistrationsDatagrid data={unapprovedCustomers} onRefresh={fetchUnapprovedCustomers} />
        </Card>
      </MKBox>

    </>
  );
};

Registrations.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <ModernLayout>{page}</ModernLayout>;{/* </AuthGuard> */}
    </>
  );
};

export default Registrations;
