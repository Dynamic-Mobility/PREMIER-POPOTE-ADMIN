import MKBox from "../../../@mui-components/box";
import {Collapse, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import MKTypography from "../../../@mui-components/typography";
import LimitsLottie from "../../../lottie-files/limits-lottie";
import ProductList, {dummyProducts} from "../global-limits/product-list";
import LimitsForm from "../global-limits/limits-form";
import SearchByCif from "./search-by-cif";
import MKButton from "../../../@mui-components/button";
import {ArrowBack} from "@mui/icons-material";
import {useRouter} from "next/router";

const PersonalizedLimits = () => {
    const router = useRouter();
    const cifNo = router.query?.cif;
    const [selectedProduct, setSelectedProduct] = useState(dummyProducts[0]);
    const [customerFound, setCustomerFound] = useState(null);

    const handleOnFoundCustomer = customer => {
        setCustomerFound(customer);
    }
    const handleOnBack = () => {
        setCustomerFound(null);
    }
    const handleOnProductSelect = product => {
        setSelectedProduct(product);
    }

    useEffect(() => {
        if (cifNo){
            handleOnFoundCustomer({ id: cifNo})
        }
    },[cifNo]);

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
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={6} xs={12}>
                            <MKButton
                                startIcon={<ArrowBack/>}
                                size={'small'}
                                sx={{ textDecoration: 'none', mb:2}}
                                variant={'text'}
                                color={'primary'}
                                onClick={handleOnBack}
                            >
                                {"Go BACK"}
                            </MKButton>
                            <ProductList
                                selectedProduct={selectedProduct}
                                onProductSelect={handleOnProductSelect}
                            />
                            <MKBox sx={{ display: {sm: 'none', md:'flex'}, justifyContent: 'center', flexDirection:'column', my:5}}>
                                <LimitsLottie/>
                                <MKTypography sx={{ mt:2}} align={'center'} variant={'caption'}>
                                    {"You can set per transaction and daily limits."}
                                </MKTypography>
                            </MKBox>

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
                                    <LimitsForm product={selectedProduct} key={selectedProduct.id}/>
                                </MKBox>
                            </Collapse>
                        </Grid>
                    </Grid>
                </Collapse>
            </MKBox>
        </>
    )
}

export default PersonalizedLimits;