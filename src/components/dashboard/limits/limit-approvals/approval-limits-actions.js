import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ConfirmationDialog from "../../../@dmt-components/confirmation-dialog";
import {settingsApis} from "../../../../api-requests/settings-apis";
import {useAuth} from "../../../../hooks/use-auth";
import {getBrowserDetails, getIPAddress} from "../../../../utils/helper-functions";
import {toast} from "react-toastify";

const ApprovalLimitsActions = props => {
    const { limit, onRefresh, edited } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const authUser = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        open: false,
        message: "",
        showReason: false,
        reject: false,
        onOk: null,
    });

    const labelID = `action_menu_${limit?.id}`;
    const buttonID = `action_button_${limit?.id}`;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        setDialogProps({
            ...dialogProps,
            open: false
        })
    }

    const handleOnApprove = (reject = false) => {
        const action = reject ? "reject" : "approve";
        setDialogProps({
            open: true,
            message: `Are you sure you want to ${action} ${limit?.name} of limit type ${limit?.limitType}?`,
            onOk: onApprove,
            reject: reject,
            showReason: reject,
        })
    };

    const onApprove = async (reason) => {
        setIsLoading(true);
        const browser = getBrowserDetails();
        const ipAddress = await getIPAddress();
        const formData = {
            id: limit?.id,
            userId: authUser?.user?.userid ?? "",
            browser: browser,
            rejectReason: reason,
            reject: dialogProps?.reject,
            ip: ipAddress
        }
        try{
            let res;
            if (edited){
                res = await settingsApis.approveEditedUnapprovedLimits(authUser, formData);
            }
            else{
                res = await settingsApis.approveUnapprovedLimits(authUser, formData);
            }

            if(res?.success){
                toast.success(res?.errorMessage ?? "Limit approved successfully!");
                handleCloseDialog();
                handleClose();
                await onRefresh();
            }
            else{
                toast.error(res?.errorMessage ?? "An error occurred while processing request. Try again later.");
            }
        }
        catch (e) {
            console.log(e?.message)
        }

        setIsLoading(false);
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
                <MenuItem onClick={() => handleOnApprove()}>
                    <CheckIcon sx={{mr: 1}}  color={'success'}/>
                    {" "}
                    {" Approve Limit"}
                </MenuItem>
                <MenuItem onClick={() => handleOnApprove(true)}>
                    <CloseIcon sx={{mr: 1}} color={'error'}/>
                    {"Reject Limit"}
                </MenuItem>
            </Menu>
            <ConfirmationDialog
                {...{
                    ...dialogProps,
                    onClose: handleCloseDialog,
                    isLoading: isLoading
                }}
            />
        </>
    )
}

export default ApprovalLimitsActions;