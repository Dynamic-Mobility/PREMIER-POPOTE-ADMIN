import React, {useCallback, useState} from "react";
import {getAutoCompleteValue} from "../../../../utils/helper-functions";
import MKButton from "../../../@mui-components/button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useAuth} from "../../../../hooks/use-auth";
import {Divider} from "@mui/material";

const AccountsDropdownlist = (props) => {
    const { accountsList, selectedAccount, onSelectAccount } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const selected = getAutoCompleteValue(accountsList, selectedAccount);
    const open = Boolean(anchorEl);
    const authUser = useAuth();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnChangeFilter = value => {
        onSelectAccount(value);
        handleClose();
    }

    console.log(selected);

    return(
        <>
            <MKButton
                //circular={true}
                // startIcon={<DateRangeOutlined/>}
                size={'small'}
                endIcon={<KeyboardArrowDownIcon/>}
                variant={'outlined'}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {selected?.account ? `A/C No: ${selected?.account}` : "-- Select A/C --"}
            </MKButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                sx={{ minWidth: '250px'}}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {accountsList?.map((filter, index) => (
                    <React.Fragment key={index}>
                        <MenuItem onClick={() => handleOnChangeFilter(filter?.id)}>
                            {filter.account}
                        </MenuItem>
                        <Divider/>
                    </React.Fragment>
                ))}
            </Menu>
        </>
    )
}

export default AccountsDropdownlist;