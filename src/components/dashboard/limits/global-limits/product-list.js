import {List} from "@mui/material";
import React, {useState} from "react";
import ProductItem from "./product-item";
import {useSelector} from "../../../../store";
import MKBox from "../../../@mui-components/box";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import MKTypography from "../../../@mui-components/typography";
import {Scrollbar} from "../../../@mui-components/scrollbar";
import {LoaderIcon} from "react-hot-toast";
const filterSearch = (options,  query) => {
    return options.filter((option) => {
        if (query){
            const name = option?.name.toLowerCase();
            return name?.includes(query.toLowerCase());
        }
        return true;
    });
}

const ProductList = props => {
    const { selectedProduct, onProductSelect} = props;
    const { transactionTypes, isLoadingTypes } = useSelector(({ settings }) => settings);
    const [query, setQuery] = useState('');

    const products = filterSearch(transactionTypes, query);
    const handleOnSelect = async (product) => {
        await onProductSelect(product)
    }

    const handleOnChange = e => {
        setQuery(e.target.value);
    }

    return(
        <>
            <MKBox sx={{ display: 'flex', p:1, justifyContent:'space-between', alignItems: 'center', mt: 1, mb: 1 }}>
                <MKTypography variant={'h6'}>
                    {" Transaction Types"}
                </MKTypography>
                <DMTTextInput
                    placeholder="Search..."
                    size={'small'}
                    label={"Search"}
                    type={"search"}
                    value={query}
                    onChange={handleOnChange}
                />
            </MKBox>
            {isLoadingTypes ? (
                <>
                    <MKTypography sx={{p:2}} align={'center'}>
                        {"Loading..."}
                    </MKTypography>
                </>
            ) : (
                <>
                    {products.length > 0 ? (
                        <Scrollbar
                            autoHide={false}
                            forceVisible={true}
                            sx={{
                                height: "75%",
                                pr: 2,
                                "& .simplebar-content": {
                                    height: "75%",
                                },
                            }}
                        >
                            <List sx={{ px:1 }}  aria-label="product list">
                                {products.map((product, index) => (
                                    <ProductItem key={ index} {...{selectedProduct,  product, onSelect: handleOnSelect}}/>
                                ))}
                            </List>
                        </Scrollbar>
                    ) : (
                        <MKTypography sx={{p:2}} align={'center'}>
                            {"No transaction Type(s) found."}
                        </MKTypography>
                    )}
                </>
            )}


        </>
    )
}

export default ProductList;