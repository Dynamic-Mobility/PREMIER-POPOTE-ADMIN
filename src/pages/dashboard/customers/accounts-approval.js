import React, {useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../store";
import {getAllCustomers, setPendingAccounts} from "../../../slices/dashboard/customers";
import {useAuth} from "../../../hooks/use-auth";
import ApprovalAccountsDatagrid
  from "../../../components/dashboard/customers/customer-accounts/approval-accounts-datagrid";
import {customersApis} from "../../../api-requests/customers-api";
import {AuthGuard} from "../../../hocs/auth-guard";
import AccountsFilterPanel from "../../../components/dashboard/customers/filters/accounts-filter-panel";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {PAGES_PATHS} from "../../../utils/constants";

const title = "Accounts Approval";

const  AccountsApprovalPage = () => {
  const initialFilters = {
    cifNumber: "",
    accountName: "",
    pageSize: 250,
    pageNumber: 1,
  }
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { pendingAccounts } = useSelector(( { customers }) => customers);
  const authUser = useAuth();

  const handleOnChangeFilters = filters =>{
    setFilters(filters)
  }

  const handleOnResetFilters = async () => {
    handleOnChangeFilters(initialFilters);
    await fetchPendingAccounts(initialFilters);
  }

  const fetchPendingAccounts = async (filters) => {
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
    fetchPendingAccounts(filters);
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
                <AccountsFilterPanel
                    filters={filters}
                    onChangeFilters={handleOnChangeFilters}
                    onResetFilters={handleOnResetFilters}
                    onSearch={() => fetchPendingAccounts(filters)}
                />
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

      <AuthGuard>
        <ModernLayout>
          <RoleBasedGuard path={PAGES_PATHS.APPROVE_CUSTOMER_ACCOUNTS} page={true}>
            {page}
          </RoleBasedGuard>
        </ModernLayout>
      </AuthGuard>
    </>
  );
};

export default AccountsApprovalPage;
