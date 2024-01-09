import React, {useCallback, useEffect, useState} from "react";
import ModernLayout from "../../../../components/layouts/modern";
import Head from "next/head";
import {appName, CHANNEL_TYPES} from "../../../../utils/constants";
import MKBox from "../../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import CustomerDetails from "../../../../components/dashboard/customers/customer-details";
import {Card, Container} from "@mui/material";
import {customersApis} from "../../../../api-requests/customers-api";
import {toast} from "react-toastify";
import {useAuth} from "../../../../hooks/use-auth";
import {useRouter} from "next/router";
import RefreshButton from "../../../../components/@dmt-components/refresh-button";
import BackButtonLink from "../../../../components/@dmt-components/back-button-link";
import {AuthGuard} from "../../../../hocs/auth-guard";

const title = 'View Customer';
const ViewCustomerPage = () => {
    const [ customer, setCustomer] = useState(null);
    const [existingCustomer, setExistingCustomer] = useState(null);
    const [ customerAccounts, setCustomerAccounts] = useState([]);
    const authUser = useAuth();
    const router = useRouter();
    const customerId = router.query?.customerId;

    const getCustomerAccounts = useCallback(async (cifNo) => {
        try{
            const res = await customersApis.getAccountSwitchByCif(authUser,cifNo)
            if (res.data){
                setCustomerAccounts(res.data);
                if (res?.data?.length > 0){
                    await handleOnSearch(res.data[0]?.account);
                }

            }
            else{
                setCustomerAccounts([]);
            }

        }
        catch (e) {
            console.log(e.message);
        }
    },[authUser?.user]);

    const handleOnSearch = useCallback (async (cifNumber) => {
        try{
            const res = await customersApis.fetchCustomerCif(authUser, cifNumber);
            if (Boolean(res?.cif_no)){
                setCustomer(res);
            }
            else{
                // handleOnReset();
                // toast.error(res?.errorMessage ?? "Oops! An error occurred. Try again");
            }
        }
        catch (e) {
           toast.error(e.message);
        }
    }, [authUser?.user])

    const handleOnAddUpdate = async (channelTypes) => {
        const formattedData = {
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            cif: customer?.cif_no,
            dob: customer?.dateofBirth,
            alias: customer?.name,
            address: customer?.postalAddress,
            phone: customer?.tel,
            kraPin: customer?.krapin,
            email: customer?.email,
            customerTypeId: null,
            secondaryPhone: customer?.mobile,
            pobox: customer?.postalAddress,
            industry: customer?.industry,
            industryCategory: customer?.category,
            location: customer?.physicalAddress,
            town: customer?.physicalAddress,
            geoLocation: null,
            name: customer?.name,
            secondaryEmail: customer?.email,
            actionDesc: customer?.accountDescription,
            idnumber: customer?.idno,
            ip: null,
            registeredForApp: channelTypes?.includes(CHANNEL_TYPES[0].value),
            registeredForUSSD: channelTypes?.includes(CHANNEL_TYPES[1].value)
        };
        try {
            const res = await customersApis.addUpdateCustomers(
                authUser,
                formattedData
            );
            const action = Boolean(customer?.custExist) ? 'updated' : 'created';
            if(res?.success){
                toast.success(`Customer details ${action} successfully`);
                setCustomer({
                    ...customer,
                    customerId: res.id,
                    custExist: true,
                })
                await getCustomerById(res.id);
            }
            else{
                toast.error(res?.errorMessage ?? 'Unable to process request. Try again!');
            }
        } catch (err) {
            console.log("ADD_UPDATE_ERROR ",err)
        }
    }

    const getCustomerById = useCallback(async () => {
        try{
           const res = await customersApis.fetchCustomerId(authUser, customerId);
            setExistingCustomer(res);
            await getCustomerAccounts(res?.customerIdNo);
        }
        catch (e) {
            console.log(e.message);
        }
    },[authUser?.user, customerId]);

    const handleOnReset = () => {
        setCustomer(null);
        setCustomerAccounts([]);
    }

    useEffect(() => {
        if (customerId){
            getCustomerById();
        }
    },[customerId]);

  return (
    <>
      <Head>
        <title>{title} | {appName}</title>
      </Head>
      <MKBox
          component="main"
          sx={{
            flexGrow: 1,
            py: 2,
          }}
      >
      <Container maxWidth="xl">
          <MKBox sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
              <Grid item>
                  <BackButtonLink label={title}/>
                {/*<MKTypography variant="h5">{title}</MKTypography>*/}
              </Grid>
                <Grid item>
                    <RefreshButton onRefresh={getCustomerById}/>
                </Grid>
            </Grid>
          </MKBox>
          <Card sx={{ minHeight: '78vh', p:2 }}>
                <CustomerDetails
                    customer={customer}
                    existingCustomer={existingCustomer}
                    customerAccounts={customerAccounts}
                    onReset={handleOnReset}
                    handleOnAddUpdate={handleOnAddUpdate}
                    onRefresh={getCustomerById}
                />
          </Card>
      </Container>
      </MKBox>
    </>
  );
};

ViewCustomerPage.getLayout = (page) => (
    <AuthGuard>
        <ModernLayout>
            {page}
        </ModernLayout>
    </AuthGuard>
);

export default ViewCustomerPage;
