import MKBox from "../../../@mui-components/box";
import {Grid} from "@mui/material";
import ProductList from "./product-list";

const GlobalLimits = () => {
    return (
        <>
            <MKBox sx={{ backgroundColor: 'background.paper', p:2}}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={6} xs={12}>
                        <ProductList/>
                    </Grid>
                </Grid>
            </MKBox>
        </>
    )
}

export default GlobalLimits;