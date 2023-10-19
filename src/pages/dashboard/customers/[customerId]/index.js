import React, {useEffect, useState} from "react";
import ModernLayout from "../../../../components/layouts/modern";
import Head from "next/head";
import {appName} from "../../../../utils/constants";
import MKBox from "../../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../../components/@mui-components/typography";
import CustomerDetails from "../../../../components/dashboard/customers/customer-details";
import {Card, Container} from "@mui/material";
import {customersApis} from "../../../../api-requests/customers-api";
import {toast} from "react-toastify";
import {useAuth} from "../../../../hooks/use-auth";
import {useRouter} from "next/router";
import RefreshButton from "../../../../components/@dmt-components/refresh-button";
import BackButtonLink from "../../../../components/@dmt-components/back-button-link";

const title = 'View Customer';
const ViewCustomerPage = () => {
    const [ customer, setCustomer] = useState(null);
    const [existingCustomer, setExistingCustomer] = useState(null);
    const [ customerAccounts, setCustomerAccounts] = useState([]);
    const authUser = useAuth();
    const router = useRouter();
    const customerId = router.query?.customerId;

    const getCustomerAccounts = async (cifNo) => {
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
    };

    const handleOnSearch = async (cifNumber) => {
        try{
            const res = await customersApis.fetchCustomerCif(authUser, cifNumber);
            if (res?.cif_no !== ''){
                setCustomer(res);
                //toast.success("Customer Found!");
                // if customer is found get their accounts
                //await getCustomerAccounts(res?.cif_no);
            }
            else{
                // handleOnReset();
                // toast.error(res?.errorMessage ?? "Oops! An error occurred. Try again");
            }
        }
        catch (e) {
           toast.error(e.message);
        }
    }

    const getCustomerById = async () => {
        try{
           const res = await customersApis.fetchCustomerId(authUser, customerId);
            setExistingCustomer(res);
            await getCustomerAccounts(res?.cif);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleOnReset = () => {
        setCustomer(null);
        setCustomerAccounts([]);
    }

    useEffect(() => {
        if (customerId){
            getCustomerById();
        }
    },[customerId])

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
                />
          </Card>
      </Container>
      </MKBox>
    </>
  );
};

ViewCustomerPage.getLayout = (page) => (
    <ModernLayout>
      {page}
    </ModernLayout>
);

export default ViewCustomerPage;
