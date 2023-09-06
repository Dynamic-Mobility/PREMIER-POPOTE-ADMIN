import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useState} from "react";
import ProductItem from "./product-item";

const dummyProducts = [
    {
        id: 1,
        name: 'Mpesa',
        icon: '',
    },
    {
        id: 2,
        name: 'Pesalink',
        icon: '',
    },
    {
        id: 3,
        name: 'RTGs',
        icon: '',
    }
]
const ProductList = props => {
    const [products, setProducts] = useState([...dummyProducts]);
    const [selectedProduct, setSelectedProduct] = useState(dummyProducts[0]);

    const handleOnSelect = (product) => {
        setSelectedProduct(product)
    }
    return(
        <>
            <List component="nav" aria-label="product list">
                {products.map((product, index) => (
                    <ProductItem key={ index} {...{selectedProduct,  product, onSelect: handleOnSelect}}/>
                ))}
            </List>
        </>
    )
}

export default ProductList;