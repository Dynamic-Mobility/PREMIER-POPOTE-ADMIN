import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import CreateUserDialog from "./create-user-dialog";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

const UsersActions = props => {
    const {
        user,
        onRefresh,
        approval = false,
        onApprove,
        onReject
    } = props;
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

    const handleOnApprove = () => {
        onApprove();
        handleClose();
    }
    const handleOnReject = () => {
        onReject();
        handleClose();
    }



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
                {Boolean(!approval) ? (
                    <CreateUserDialog onRefresh={onRefresh} user={user} onClose={handleClose}/>
                ) : (
                    <>
                        <MenuItem onClick={handleOnApprove}>
                            <EditIcon sx={{mr: 1}} />
                            {" "}
                            {" Approve User"}
                        </MenuItem>
                        <MenuItem onClick={handleOnReject}>
                            <EditIcon sx={{mr: 1}} />
                            {" "}
                            {" Reject User"}
                        </MenuItem>
                    </>
                )}

            </Menu>
        </>
    )
}

export default UsersActions;