import MKButton from "../../@mui-components/button";
import DateRangeOutlined from "@mui/icons-material/DateRangeOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

const TransactionFilters = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <>
            <MKButton
                startIcon={<DateRangeOutlined/>}
                endIcon={<KeyboardArrowDownIcon/>}
                size={'small'}
                sx={{textTransform: 'none' }}
                color={'primary'}
                variant={'text'}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {"Today"}
            </MKButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Today</MenuItem>
                <MenuItem onClick={handleClose}>Yesterday</MenuItem>
                <MenuItem onClick={handleClose}>Last 7 Days</MenuItem>
                <MenuItem onClick={handleClose}>Last 30 Days</MenuItem>
                <MenuItem onClick={handleClose}>Custom</MenuItem>
            </Menu>
        </>
    )
}

export default TransactionFilters;