import {Box, Button, Collapse, Icon, ListItem} from "@mui/material";

import NextLink from "next/link";
import PropTypes from "prop-types";
import { useState } from "react";
import {alpha} from "@mui/material/styles";
import ChevronRight  from "@mui/icons-material/ChevronRight"
import ExpandMore from "@mui/icons-material/ExpandMore";


const ModernSidebarItem = (props) => {
    const {
        active,
        children,
        disabled,
        chip,
        depth,
        icon,
        role,
        bold= false,
        info,
        open: openProp,
        path,
        title,
        key,
        ...other
    } = props;
    const [open, setOpen] = useState(!!openProp);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    let paddingLeft = 10;

    if (depth > 0) {
        paddingLeft = 10+  8 * depth;
    }
    // if(!key){
    //     return null;
    // }

    // Branch
    if (children) {
        return (
                 <ListItem
                disableGutters
                sx={{
                    display: "block",
                    mb: 0.5,
                    py: 0,
                    px: 1.5,
                }}
                {...other}
            >
                <Button
                    //disabled={disabled}
                    endIcon={
                        !open ? (
                            <ChevronRight fontSize="small" />
                        ) : (
                            <ExpandMore fontSize="small" />
                        )
                    }
                    //disableRipple
                    onClick={handleToggle}
                    startIcon={<Icon>{icon}</Icon>}
                    sx={{
                        backgroundColor: active ? "grey.200":"inherit",
                        fontWeight: bold && 'bold',
                        //   backgroundColor: theme => {
                        //       return active ? alpha(theme.palette.primary.main,0.5) : "inherit"
                        //   },
                        color: active ? "primary.main" : "text.main",
                        justifyContent: "flex-start",
                        pl: `${paddingLeft}px`,
                        pr: 3,
                        textAlign: "left",
                        textTransform: "none",
                        width: "100%",
                        "&:hover": {
                            backgroundColor: active ? "grey.200":"inherit",
                            //backgroundColor: active ? "primary.main":"grey.200",
                            color: active ? 'primary.main' : 'text.main',
                        },
                        "& .MuiButton-startIcon": {
                            color: active ? "primary.main" : "text.main",
                        },
                        "& .MuiButton-endIcon": {
                            color: active ? "primary.main" : "text.main",
                        },
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                    {info}
                </Button>
                <Collapse in={open} sx={{ mt: 0.5}}>
                    <Box sx={{ py:1, backgroundColor: 'background.default', borderRadius:1}}>
                        {children}
                    </Box>
                </Collapse>
            </ListItem>

           
        );
    }

    // Leaf
    return (

 <ListItem
            disableGutters
            sx={{
                display: "flex",
                mb: 0.5,
                py: 0,
                px: 1.5,
            }}
        >
            <NextLink href={path ?? "/"} passHref>
                <Button
                    component="a"
                    disabled={disabled}
                    startIcon={<Icon>{icon}</Icon>}
                    endIcon={chip}
                    //disableRipple
                    sx={{
                        borderRadius: 1,
                        color: "text.main",
                        justifyContent: "flex-start",
                        pl: `${paddingLeft}px`,
                        pr: 3,
                        textAlign: "left",
                        textTransform: "none",
                        fontWeight: bold && 'bold',
                        width: "100%",
                        ...(active && {
                            //backgroundColor: "neutral.200",
                            backgroundColor: theme => {
                                return alpha(theme.palette.primary.main,1)
                            },
                            color:  "light.main",
                            fontWeight: "bold",
                        }),
                        "& .MuiButton-startIcon": {
                            color: active? "light.main" : "inherit",
                        },
                        "&:hover": {
                            color: active ? "light.main" : "primary.main",
                            backgroundColor: active ? "primary.main":"grey.200",
                        },
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                    {info}
                </Button>
            </NextLink>
        </ListItem>
       
    );
};

ModernSidebarItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    depth: PropTypes.number.isRequired,
    icon: PropTypes.node,
    info: PropTypes.node,
    open: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string.isRequired,
};

ModernSidebarItem.defaultProps = {
    active: false,
    open: false,
};

export default ModernSidebarItem;
