import React, {useState} from "react";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import {appName, CHANNEL_TYPES, PAGES_PATHS} from "../../../utils/constants";
import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../components/@mui-components/typography";
import CustomerDetails from "../../../components/dashboard/customers/customer-details";
import {Card, Container} from "@mui/material";
import CustomerSearch from "../../../components/dashboard/customers/customer-details/customer-search";
import {customersApis} from "../../../api-requests/customers-api";
import {toast} from "react-toastify";
import {useAuth} from "../../../hooks/use-auth";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {getIPAddress} from "../../../utils/helper-functions";

const title = 'Customer Details';
const CustomerDetailsPage = () => {
    const [ customer, setCustomer] = useState(null);
    const [ customerAccounts, setCustomerAccounts] = useState([]);
    const [existingCustomer, setExistingCustomer] = useState(null);
    const authUser = useAuth();
    const [searchAccNo, setSearchAccNo] = useState("");

    const getCustomerAccounts = async (cifNo) => {
        try{
            const res = await customersApis.getAccountSwitchByCif(authUser,cifNo)
            setCustomerAccounts(res.data);
        }
        catch (e) {
            console.log(e.message);
        }
    };

    const handleOnSearch = async (cifNumber) => {
        setExistingCustomer(null);
        setCustomer(null);
        try{
            const res = await customersApis.fetchCustomerCif(authUser, cifNumber);
            if (Boolean(res?.cif_no)){
                setCustomer(res);
                toast.success("Customer Found!");
                if (res?.customerId){
                    await getCustomerById(res?.customerId);
                }
                else{
                    setSearchAccNo(cifNumber);
                }
                // if customer is found get their accounts
                await getCustomerAccounts(res?.idno);
            }
            else{
                handleOnReset();
                toast.error(res?.errorMessage ?? "Oops! An error occurred. Try again");
            }
        }
        catch (e) {
           toast.error(e.message);
        }
    }

    const getCustomerById = async (customerId) => {
        try{
           const res = await customersApis.fetchCustomerId(authUser, customerId)
            setExistingCustomer(res);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleOnAddUpdate = async (channelTypes) => {
        const ipAddress = await getIPAddress();
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
            defaultAccountNumber: searchAccNo,
            secondaryEmail: customer?.email,
            actionDesc: customer?.accountDescription,
            idnumber: customer?.idno,
            ip: ipAddress,
            registeredForApp: channelTypes?.includes(CHANNEL_TYPES[1].value),
            registeredForUSSD: channelTypes?.includes(CHANNEL_TYPES[0].value)
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
                await  getCustomerAccounts(customer.idno);
            }
            else{
                toast.error(res?.errorMessage ?? 'Unable to process request. Try again!');
            }
        } catch (err) {
            console.log("ADD_UPDATE_ERROR ",err)
        }
    }


    const handleOnReset = () => {
        setCustomer(null);
        setCustomerAccounts([]);
        setExistingCustomer(null);
    }


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
                <MKTypography variant="h4">{title}</MKTypography>
              </Grid>
                <Grid item>
                    <CustomerSearch
                        onSearch={handleOnSearch}
                    />
                </Grid>
            </Grid>
          </MKBox>
          <Card sx={{ minHeight: '78vh', p:2 }}>
                <CustomerDetails
                    customer={customer}
                    handleOnAddUpdate={handleOnAddUpdate}
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

CustomerDetailsPage.getLayout = (page) => (
    <AuthGuard>
        <ModernLayout>
            <RoleBasedGuard path={PAGES_PATHS.CUSTOMER_DETAILS} page={true}>
                {page}
            </RoleBasedGuard>
        </ModernLayout>
    </AuthGuard>

);

export default CustomerDetailsPage;
