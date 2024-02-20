import React, {useEffect, useState} from "react";
import {Card, Grid, Tab, Tabs} from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import ModernLayout from "../../../../components/layouts/modern";
import Head from "next/head";
import CustomerActionsButton from "../../../../components/dashboard/customers/filters/customer-actions-button";
import MKBox from "../../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../../store";
import {useAuth} from "../../../../hooks/use-auth";
import {AuthGuard} from "../../../../hocs/auth-guard";
import {getOTPRequests} from "../../../../slices/dashboard/users";
import OtpSmsDatagrid from "../../../../components/dashboard/reports/system-reports/otp-sms-datagrid";

const title = "OTP Sms";

const OTPSmsPage = () => {
  const initialFilters = {
    name: "",
    idnumber: "",
    phonenumber: "",
    cifNumber: "",
    email: "",
    userType: "Customer",
  }
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();
  const { otpRequests , pageSize, currentPage} = useSelector(( { users }) => users);
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
    await dispatch(getOTPRequests(authUser,values ))
  }

  const handleOnSearch = async () => {
    await fetchOTPRequests();
  }

  const handleChange = (e, newValue) => {
    setFilters({
      ...filters,
      userType: newValue
    });
  }

  const fetchOTPRequests = async () => {
    const values = {
      ...filters,
      pageSize,
      pageNumber: currentPage,
    }
    await dispatch(getOTPRequests(authUser,values ))
  }

  useEffect(() => {
    fetchOTPRequests();
  }, [filters.userType])

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
            <MKBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={filters.userType} onChange={handleChange} aria-label="basic tabs example">
                <Tab value={'Customer'} label="Customers' OTPs" {...a11yProps(0)} />
                <Tab value={'User'} label="System Users' OTPs" {...a11yProps(1)} />
              </Tabs>
            </MKBox>
            <OtpSmsDatagrid isCustomer={Boolean(filters.userType === 'Customer')} data={otpRequests} />
          </Card>
        </MKBox>

      </>
  );
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
OTPSmsPage.getLayout = (page) => {
  return (
      <>
        <AuthGuard>
          <ModernLayout>{page}</ModernLayout>
        </AuthGuard>
      </>
  );
};

export default OTPSmsPage;
