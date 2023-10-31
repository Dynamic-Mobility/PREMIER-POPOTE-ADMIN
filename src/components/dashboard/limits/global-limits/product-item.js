import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, alpha} from "@mui/material";
import {Check} from "@mui/icons-material";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import {getInitials} from "../../../../utils/helper-functions";


const ProductItem = props => {
    const { selectedProduct, product, onSelect } = props;
    return(
        <>

            <ListItem  alignItems="flex-start">
                <ListItemButton
                    role={undefined}
                    selected={product?.id === selectedProduct?.id}
                    onClick={(event) => onSelect(product)}
                >
                    <ListItemAvatar>
                        <Avatar
                            src={product.icon}
                            variant={'rounded'}
                            sx={{
                                height: 35,
                                width: 35,
                                backgroundColor: theme => alpha(theme.palette.success.main, 0.2),
                                color: 'success.main',
                            }}
                        >
                            <MKTypography fontWeight={'bold'} variant={'body2'} sx={{ fontSize: '12px'}}>
                                {getInitials(product.name)}
                            </MKTypography>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                        <>
                            <MKTypography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="h6"
                                color="text.primary"
                            >
                                {product.name}
                            </MKTypography>
                        </>
                    }
                        // secondary={
                        //     <>
                        //         <MKTypography
                        //             sx={{ display: 'inline' }}
                        //             component="span"
                        //             variant="body2"
                        //             color="text.primary"
                        //         >
                        //             {searchResults?.company_registration_no}
                        //         </MKTypography>
                        //     </>
                        // }
                    />
                </ListItemButton>
            </ListItem>
        </>
    )
}

export default ProductItem;