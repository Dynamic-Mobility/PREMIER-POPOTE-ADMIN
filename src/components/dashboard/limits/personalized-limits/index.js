import MKBox from "../../../@mui-components/box";
import {Collapse, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import MKTypography from "../../../@mui-components/typography";
import LimitsLottie from "../../../lottie-files/limits-lottie";
import ProductList from "../global-limits/product-list";
import LimitsForm from "../global-limits/limits-form";
import SearchByCif from "./search-by-cif";
import {ArrowBack} from "@mui/icons-material";
import {useRouter} from "next/router";
import CustomerSummary from "./customer-summary";
import IconButton from "@mui/material/IconButton";
import AccountsDropdownlist from "./accounts-dropdownlist";
import {customersApis} from "../../../../api-requests/customers-api";
import {useAuth} from "../../../../hooks/use-auth";

const PersonalizedLimits = () => {
    const router = useRouter();
    const cifNo = router.query?.cif;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [customerFound, setCustomerFound] = useState(null);
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const authUser  = useAuth();

    const handleOnFoundCustomer = async customer => {
        setCustomerFound(customer);
        await fetchAccounts(customer?.cif_no);
    }
    const handleOnBack = () => {
        setCustomerFound(null);
        setSelectedAccount(null);
        setCustomerAccounts([]);
    }

    const handleOnClose = () => {
        setSelectedProduct(null)
    }
    const handleOnProductSelect = product => {
        setSelectedProduct(product);
    }

    const handleOnSelectAccount = account => {
        setSelectedAccount(account);
    }

    const fetchAccounts = async (cif) => {
        try{
            const res = await customersApis.getAccountSwitchByCif(authUser,cif)
            setCustomerAccounts(res.data);
        }
        catch (e) {
            console.log(e.message);
        }
    };

    // useEffect(() => {
    //     if (cifNo){
    //         handleOnFoundCustomer({ id: cifNo})
    //     }
    // },[cifNo]);


    return (
        <>
            <MKBox>
                <Collapse in={Boolean(!customerFound)}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={4} xs={12}/>
                    <Grid item sm={12} md={4} xs={12}>
                        <SearchByCif onFoundCustomer={handleOnFoundCustomer} />
                    </Grid>
                    <Grid item sm={12} md={4} xs={12}/>
                </Grid>
                </Collapse>
                <Collapse in={Boolean(customerFound)}>
                    <>
                        {customerFound && (
                            <MKBox sx={{
                                display: 'flex',
                                gap:1,
                                backgroundColor: 'primary.main',
                                p:1,
                                //mx:-1,
                                mt:-1,
                                borderRadius: 3,
                            }}>
                                <IconButton
                                    onClick={handleOnBack}
                                >
                                    <ArrowBack sx={{ color: 'light.main'}}/>
                                </IconButton>
                                <CustomerSummary
                                    customer={customerFound}
                                />
                                <MKBox sx={{ flex: '1 0 auto'}}/>
                                <AccountsDropdownlist
                                    accountsList={customerAccounts}
                                    selectedAccount={selectedAccount}
                                    onSelectAccount = {handleOnSelectAccount}
                                />

                            </MKBox>
                        )}
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={6} xs={12}>
                                <ProductList
                                    selectedProduct={selectedProduct}
                                    onProductSelect={handleOnProductSelect}
                                />
                            </Grid>
                            <Grid item sm={12} md={6} xs={12}>
                                <Collapse in={Boolean(selectedProduct)}>
                                    <MKBox sx={{ p:{md:3, sm:1, xs:1}, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                        <MKTypography color={'primary'} variant={'h6'} align={'center'}>
                                            {selectedProduct?.name}
                                        </MKTypography>
                                        <MKTypography variant={'caption'} align={'center'}>
                                            {"Adjust the limits from here."}
                                        </MKTypography>
                                        <LimitsForm
                                            product={selectedProduct}
                                            key={selectedProduct?.id}
                                            accountId={selectedAccount}
                                            onClose={handleOnClose}
                                        />
                                    </MKBox>
                                </Collapse>
                                <MKBox sx={{ display: {sm: 'none', md:'flex'}, justifyContent: 'center', flexDirection:'column', my:5}}>
                                    <LimitsLottie/>
                                    <MKTypography sx={{ mt:2}} align={'center'} variant={'caption'}>
                                        {"You can set per transaction and daily limits."}
                                    </MKTypography>
                                </MKBox>
                            </Grid>
                        </Grid>
                    </>
                </Collapse>
            </MKBox>
        </>
    )
}

export default PersonalizedLimits;