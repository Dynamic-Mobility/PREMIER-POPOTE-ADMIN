import MKButton from "../../@mui-components/button";
import DateRangeOutlined from "@mui/icons-material/DateRangeOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {getAutoCompleteValue} from "../../../utils/helper-functions";

const daysFilters = [
    {
        id: 1,
        label: 'Today',
        value: 0,
    },
    {
        id: 2,
        label: 'Yesterday',
        value: -1,
    },
    {
        id: 3,
        label: 'Last 7 days',
        value: -7,
    },
    {
        id: 4,
        label: 'Last 30 days',
        value: -30,
    },
    {
        id: 5,
        label: 'Custom',
        value: 1,
    },

]


const TransactionFilters = props => {
    const { dateRange } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedValue, setSelectedValue] = useState(0);
    const selected = getAutoCompleteValue(daysFilters, selectedValue, 'value');
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnChangeFilter = value => {
        setSelectedValue(value);
        handleClose();
    }



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
                {selected?.label}
            </MKButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
               // variant={"selectedMenu"}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {daysFilters.map((filter, index) => (
                    <MenuItem key={index} onClick={() => handleOnChangeFilter(filter?.value)}>
                        {filter.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default TransactionFilters;