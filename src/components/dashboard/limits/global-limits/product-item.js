import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    alpha,
    IconButton,
    Divider
} from "@mui/material";
import MKTypography from "../../../@mui-components/typography";
import {getInitials} from "../../../../utils/helper-functions";
import ArrowRight from "@mui/icons-material/ArrowRight";
import {LoaderIcon} from "react-hot-toast";
import {useState} from "react";

const ProductItem = props => {
    const { selectedProduct, product, onSelect} = props;
    const [isLoading, setIsLoading] = useState(false);
    const selected = product?.id === selectedProduct?.id;

    const handleOnClick = async (product) => {
        setIsLoading(true);
        await onSelect(product);
        setIsLoading(false);
    }

    return(
        <>
            <ListItem
                sx={{
                    cursor:'pointer',
                    backgroundColor:  (theme) => selected && alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 2,
                    p:1,
                }}
                onClick={(event) => handleOnClick(product)}
                secondaryAction={
                    <IconButton
                        color={'primary'}
                        aria-label="delete"
                    >
                        {isLoading ? <LoaderIcon/> : <ArrowRight />  }
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar
                        src={product.icon}
                        variant={'rounded'}
                        sx={{
                            height: 35,
                            width: 35,
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                            color: 'primary.main',
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
                />
            </ListItem>
            <Divider sx={{ my: 0.2}}/>
        </>
    )
}

export default ProductItem;