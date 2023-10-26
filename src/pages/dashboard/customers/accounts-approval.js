import React, {useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import CustomersDataGrid from "../../../components/dashboard/customers/customers-data-grid";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import CustomerActionsButton from "../../../components/dashboard/customers/filters/customer-actions-button";
import MKBox from "../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../store";
import {getAllCustomers, setPendingAccounts} from "../../../slices/popote/customers";
import {useAuth} from "../../../hooks/use-auth";
import ApprovalAccountsDatagrid
  from "../../../components/dashboard/customers/customer-accounts/approval-accounts-datagrid";
import {customersApis} from "../../../api-requests/customers-api";

const title = "Accounts Approval";

const  AccountsApprovalPage = () => {
  const initialFilters = {
    cifNumber: "",
    accountName: "",
    pageSize: 50,
    pageNumber: 1,
  }
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { pendingAccounts , pageSize, currentPage} = useSelector(( { customers }) => customers);
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
    await fetchPendingAccounts();
  }

  const fetchPendingAccounts = async () => {
    try{
      const res = await customersApis.fetchUnapprovedAccounts(authUser, filters);
      if(Array.isArray(res.data)){
        dispatch(setPendingAccounts(res.data))

      }
      console.log(res);
    }
    catch (e) {
      console.log(e.message);
    }
  }


  useEffect(() => {
    fetchPendingAccounts();
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
              {/*<CustomerActionsButton {...{*/}
              {/*  filters,*/}
              {/*  onChangeFilters: handleOnChangeFilters,*/}
              {/*  onResetFilters: handleOnResetFilters,*/}
              {/*  onSearch: handleOnSearch*/}
              {/*}} />*/}
            </Grid>
          </Grid>
          </MKBox>
          <Card sx={{ p: 1 }}>
            <ApprovalAccountsDatagrid
                data={pendingAccounts}
                filters={filters}
                onRefresh={fetchPendingAccounts}
            />
          </Card>
        </MKBox>

    </>
  );
};

AccountsApprovalPage.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <ModernLayout>{page}</ModernLayout>
      {/* </AuthGuard> */}
    </>
  );
};

export default AccountsApprovalPage;
