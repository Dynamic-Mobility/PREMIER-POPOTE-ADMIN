import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import CreateUserDialog from "./create-user-dialog";
import MenuItem from "@mui/material/MenuItem";
import UpdateUserStatus from "./update-user-status";
import CheckIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UsersActions = props => {
    const {
        user,
        onRefresh,
        onView,
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

    const handleOnView = () => {
        onView();
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
                    <>
                        <MenuItem onClick={handleOnView}>
                            <VisibilityIcon sx={{mr: 1}}/>
                            {" "}
                            {" View User"}
                        </MenuItem>

                        <CreateUserDialog onRefresh={onRefresh} user={user} onClose={handleClose}/>
                        <UpdateUserStatus onRefresh={onRefresh} user={user} onClose={handleClose} />
                    </>
                ) : (
                    <>
                        <MenuItem onClick={handleOnApprove}>
                            <CheckIcon sx={{mr: 1}}  color={'success'}/>
                            {" "}
                            {" Approve User"}
                        </MenuItem>
                        <MenuItem onClick={handleOnReject}>
                            <CloseIcon sx={{mr: 1}} color={'error'}/>
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