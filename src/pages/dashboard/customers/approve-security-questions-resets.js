import React, {useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import CustomerActionsButton from "../../../components/dashboard/customers/filters/customer-actions-button";
import MKBox from "../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../store";
import {getSecurityQuestionsResets} from "../../../slices/dashboard/customers";
import {useAuth} from "../../../hooks/use-auth";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {PAGES_PATHS} from "../../../utils/constants";
import ResetSecurityQuestionsDatagrid
  from "../../../components/dashboard/customers/customer-datagrids/reset-security-questions-datagrid";

const title = "Approve Security Questions Reset";

const  ApproveSecurityQuestionResetsPage = () => {
  const initialFilters = {
    name: "",
    idnumber: "",
    phonenumber: "",
    cifNumber: "",
    email: "",
  }
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { securityQuestionsResets , pageSize, currentPage} = useSelector(( { customers }) => customers);
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
    await dispatch(getSecurityQuestionsResets(authUser,values ))
  }

  const handleOnSearch = async () => {
    await fetchSecurityQuestionResets();
  }

  const fetchSecurityQuestionResets = async () => {
    const values = {
      ...filters,
      pageSize,
      pageNumber: currentPage,

   }
    await dispatch(getSecurityQuestionsResets(authUser,values ))
  }


  useEffect(() => {
    fetchSecurityQuestionResets();
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
            <ResetSecurityQuestionsDatagrid data={securityQuestionsResets} onRefresh={fetchSecurityQuestionResets} />
          </Card>
        </MKBox>

    </>
  );
};

ApproveSecurityQuestionResetsPage.getLayout = (page) => {
  return (
    <>
      <AuthGuard>
        <ModernLayout>
          <RoleBasedGuard path={PAGES_PATHS.APPROVE_SECURITY_QUESTIONS_RESETS} page={true}>
            {page}
          </RoleBasedGuard>
        </ModernLayout>
      </AuthGuard>
    </>
  );
};

export default ApproveSecurityQuestionResetsPage;
