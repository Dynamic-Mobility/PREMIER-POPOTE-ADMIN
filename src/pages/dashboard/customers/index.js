import React, {useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import CustomersDataGrid from "../../../components/dashboard/customers/customers-data-grid";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import CustomerActionsButton from "../../../components/dashboard/customers/filters/customer-actions-button";
import MKBox from "../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../store";
import {getAllCustomers} from "../../../slices/popote/customers";
import {useAuth} from "../../../hooks/use-auth";

const title = "Existing Customers";

const Customers = () => {
  const initialFilters = {
    name: "",
    idnumber: "",
    phonenumber: "",
    cifNumber: "",
    email: "",
  }
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { customers, pageSize, currentPage} = useSelector(( { customers }) => customers);
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
    await dispatch(getAllCustomers(authUser,values ))
  }

  const handleOnSearch = async () => {
    await fetchAllCustomers();
  }

  const fetchAllCustomers = async () => {
    const values = {
      ...filters,
      pageSize,
      pageNumber: currentPage,
   }
    await dispatch(getAllCustomers(authUser,values ))
  }


  useEffect(() => {
    fetchAllCustomers();
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
            <CustomersDataGrid data={customers} />
          </Card>
        </MKBox>

    </>
  );
};

Customers.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <ModernLayout>{page}</ModernLayout>; // {/* </AuthGuard> */}
    </>
  );
};

export default Customers;
