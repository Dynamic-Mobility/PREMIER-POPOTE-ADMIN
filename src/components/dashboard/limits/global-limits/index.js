import MKBox from "../../../@mui-components/box";
import {Collapse, Grid} from "@mui/material";
import ProductList, {dummyProducts} from "./product-list";
import {useState} from "react";
import LimitsForm from "./limits-form";
import MKTypography from "../../../@mui-components/typography";
import LimitsLottie from "../../../lottie-files/limits-lottie";
import {settingsApis} from "../../../../api-requests/settings-apis";
import {useAuth} from "../../../../hooks/use-auth";

const GlobalLimits = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [existingLimit, setExistingLimit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuth();
    const handleOnProductSelect = async product => {
        await fetchLimitByTxn(product);
        setSelectedProduct(product);
    }

    const handleOnClose = () => {
        setSelectedProduct(null)
    }

    const fetchLimitByTxn = async (product) => {
        setIsLoading(true);
        const formData = {
            trnId: product?.id,
            accountId: ""
        }
        try{
            const res = await settingsApis.fetchLimit(authUser, formData);
            if (res.id){
                setExistingLimit(res);
            }
            else{
                setExistingLimit(null);
            }

        }
        catch (e){
            console.log(e.message)
        }
    }


    return (
        <>
            <MKBox>
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
                                    existingLimit={existingLimit}
                                    product={selectedProduct}
                                    key={selectedProduct?.id}
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
            </MKBox>
        </>
    )
}

export default GlobalLimits;