import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import CreateUserDialog from "./create-user-dialog";

const UsersActions = props => {
    const { user, onRefresh } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const labelID = `action_menu_${user?.id}`;
    const buttonID = `action_button_${user?.id}`;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };




    return (
        <>
            <IconButton
                id={buttonID}
                aria-controls={open ? labelID : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>

            <Menu
                id={labelID}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': buttonID,
                }}
                >
                <CreateUserDialog onRefresh={onRefresh} user={user} onClose={handleClose}/>
            </Menu>
        </>
    )
}

export default UsersActions;