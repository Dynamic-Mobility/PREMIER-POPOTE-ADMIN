import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ConfirmationDialog from "../../../@dmt-components/confirmation-dialog";
import {useAuth} from "../../../../hooks/use-auth";
import {getBrowserDetails, getIPAddress} from "../../../../utils/helper-functions";
import {toast} from "react-toastify";
import {customersApis} from "../../../../api-requests/customers-api";
import {APPROVAL_ACTION_TYPES} from "../../../../utils/constants";

const NewCustomerApproval = props => {
    const { customer, onRefresh} = props;
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

    const labelID = `action_menu_${customer?.id}`;
    const buttonID = `action_button_${customer?.id}`;
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
            message: `Are you sure you want to ${action} register request for ${customer?.name}?`,
            reject: reject,
            showReason: reject,
        })
    };

    const onApprove = async (reason) => {
        setIsLoading(true);
        const browser = getBrowserDetails();
        const ipAddress = await getIPAddress();
        const formData = {
            customerId: customer?.id,
            customerUserId: customer?.customerUserId,
            approvedBy: authUser?.user?.userid ?? "",
            channelType: "USSD",
            actionType: dialogProps?.reject ? APPROVAL_ACTION_TYPES.REJECT : APPROVAL_ACTION_TYPES.APPROVE,
            reason: reason,
            browser: browser,
            ip: ipAddress
        }
        try{
            const res = await customersApis.approveCustomer(authUser, formData);
            if(res?.success){
                toast.success(res?.errorMsg ?? "Operation successful!");
                handleCloseDialog();
                handleClose();
                await onRefresh();
            }
            else{
                toast.error(res?.errorMsg ?? "An error occurred while processing request. Try again later.");
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
                    {" Approve"}
                </MenuItem>
                <MenuItem onClick={() => handleOnApprove(true)}>
                    <CloseIcon sx={{mr: 1}} color={'error'}/>
                    {"Reject"}
                </MenuItem>
            </Menu>
            <ConfirmationDialog
                {...{
                    ...dialogProps,
                    onOk: onApprove,
                    onClose: handleCloseDialog,
                    isLoading: isLoading
                }}
            />
        </>
    )
}

export default NewCustomerApproval;