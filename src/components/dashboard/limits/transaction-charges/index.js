import MKBox from "../../../@mui-components/box";
import {Collapse, Grid} from "@mui/material";
import ProductList from "../global-limits/product-list";
import MKTypography from "../../../@mui-components/typography";
import {useState} from "react";
import ChargesForm from "./charges-form";
import {settingsApis} from "../../../../api-requests/settings-apis";
import {useAuth} from "../../../../hooks/use-auth";
const TransactionCharges = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [existingCharge, setExistingCharge] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuth();
    const handleOnProductSelect = async product => {
        await fetchChargeByTxn(product);
        setSelectedProduct(product);
    }

    const handleOnClose = () => {
        setSelectedProduct(null)
    }

    const fetchChargeByTxn = async (product) => {
        setIsLoading(true);
        const formData = {
            id: product?.id,
        }
        try{
            const res = await settingsApis.fetchCharge(authUser, formData);
            if (res.id){
                setExistingCharge(res);
            }
            else{
                setExistingCharge(null);
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
                            <MKBox sx={{ p:{md:1, sm:1, xs:1}, display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                <MKTypography color={'primary'} variant={'h6'} align={'center'}>
                                    {selectedProduct?.name}
                                </MKTypography>
                                <MKTypography variant={'caption'} align={'center'}>
                                    {"Adjust the charges from here."}
                                </MKTypography>
                                <ChargesForm
                                    existingCharge={existingCharge}
                                    product = {selectedProduct}
                                    key={selectedProduct?.id}
                                    onClose={handleOnClose}
                                    onRefresh={fetchChargeByTxn}
                                />
                            </MKBox>
                        </Collapse>
                    </Grid>
                </Grid>
            </MKBox>
        </>
    )
}

export default TransactionCharges;