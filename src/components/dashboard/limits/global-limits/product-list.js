import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useState} from "react";
import ProductItem from "./product-item";

export const dummyProducts = [
    {
        id: 1,
        name: 'Mpesa',
        icon: '',
        desc: 'Please '
    },
    {
        id: 2,
        name: 'Pesalink',
        icon: '',
    },
    {
        id: 3,
        name: 'RTGS',
        icon: '',
    },
    {
        id: 4,
        name: 'Bill Payments',
        icon: '',
    }
]
const ProductList = props => {
    const { selectedProduct, onProductSelect} = props;
    const [products, setProducts] = useState([...dummyProducts]);
    const handleOnSelect = (product) => {
        onProductSelect(product)
    }
    return(
        <>
            <List aria-label="product list">
                {products.map((product, index) => (
                    <ProductItem key={ index} {...{selectedProduct,  product, onSelect: handleOnSelect}}/>
                ))}
            </List>
        </>
    )
}

export default ProductList;