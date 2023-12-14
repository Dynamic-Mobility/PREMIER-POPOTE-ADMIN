import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import ConfirmationDialog from "../../@dmt-components/confirmation-dialog";
import {getBrowserDetails, getIPAddress} from "../../../utils/helper-functions";
import {useAuth} from "../../../hooks/use-auth";
import {usersApis} from "../../../api-requests/users-apis";
const UpdateUserStatus = props => {
    const { user, onClose } = props;
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuth();
    const [dialogProps, setDialogProps] = useState({
        open: false,
        message: "",
        showReason: false,
        reject: false,
        onOk: null,
    });

    const handleCloseDialog = () => {
        setDialogProps({
            ...dialogProps,
            open: false
        })
        onClose?.();
    }

    const handleOnApprove = (reject = false) => {
        const action = reject ? "disable" : "activate";
        setDialogProps({
            open: true,
            message: `Are you sure you want to ${action} ${user?.firstName} ${user?.otherName}?`,
            onOk: onApprove,
            reject: reject,
            showReason: false,
        })
    };

    const onApprove = async () => {
        setIsLoading(true);
        const browser = getBrowserDetails();
        const ipAddress = await getIPAddress();
        const formData = {
            userid: user?.id,
            ip: ipAddress,
            browser: browser,
        }
        try{

            const res = await usersApis.enableDisableUser(authUser, formData);
            console.log(res);
        }
        catch (e) {
            console.log(e?.message)
        }

        setIsLoading(false);
    }

    return (
        <>
            {Boolean(user?.activated) && (
                <>
                    {Boolean(user?.status !== 'Active') ? (
                        <>
                            <MenuItem onClick={() => handleOnApprove()}>
                                <CheckIcon sx={{mr: 1}}  color={'success'}/>
                                {" "}
                                {" Activate User"}
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem onClick={() => handleOnApprove(true)}>
                            <CloseIcon sx={{mr: 1}} color={'error'}/>
                            {"Disable User"}
                        </MenuItem>
                    )}
                    <ConfirmationDialog
                        {...{
                            ...dialogProps,
                            onClose: handleCloseDialog,
                            isLoading: isLoading
                        }}
                    />
                </>
            )}
        </>
    )
}

export default UpdateUserStatus;