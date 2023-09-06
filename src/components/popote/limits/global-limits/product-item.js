import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Check} from "@mui/icons-material";
import MKBox from "../../../@mui-components/box";


const ProductItem = props => {
    const { selectedProduct, product, onSelect } = props;
    return(
        <>
            <MKBox>

            </MKBox>




            <ListItemButton
                selected={product?.id === selectedProduct?.id}
                onClick={(event) => onSelect(product)}
            >
                <ListItemIcon>
                    <Check/>
                </ListItemIcon>
                <ListItemText primary={product?.name} />
            </ListItemButton>
        </>
    )
}

export default ProductItem;