import {useState} from "react";
import MKButton from "../../../@mui-components/button";
import DMTDialog from "../../../@dmt-components/dialog";
import DialogContent from "@mui/material/DialogContent";
import {BLOCK_ACTION_TYPES, BLOCK_TYPES, CHANNEL_TYPES} from "../../../../utils/constants";
import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import * as React from "react";
import {LoaderIcon} from "react-hot-toast";
import {customersApis} from "../../../../api-requests/customers-api";
import {useAuth} from "../../../../hooks/use-auth";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import {toast} from "react-toastify";
import {getBrowserDetails, getIPAddress} from "../../../../utils/helper-functions";
import MenuItem from "@mui/material/MenuItem";

const BlockUnblockUnlinkAccount = props => {
    const {
        existingCustomer,
        disabled = false,
        action= BLOCK_ACTION_TYPES.BLOCK,
        account,
        label = "Block Customer",
        type = "button",
        blockType= BLOCK_TYPES.CUSTOMER,
        onClose
    } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [reason, setReason] = useState("");
    const authUser = useAuth();

    const getMessage = () => {
        let message;
        if (Boolean(existingCustomer)){
            message = (
                <MKTypography align={'center'} gutterBottom>
                    {`Are you sure you want to block customer - `}
                    <b>{existingCustomer?.name} ?</b>
                </MKTypography>
            )
        }
        if (Boolean(account)){
            message = (
                <MKTypography align={'center'} gutterBottom>
                    {`Are you sure you want to ${action} account - `}
                    <b>{account?.account} ?</b>
                </MKTypography>
            )
        }
        return message;
    }

    const handleOnChange = e => {
        setReason(e.target.value);
    }

    const handleOnProceed = async () => {
        setIsLoading(true)
        const ipAddress = await getIPAddress();
        const browser = await getBrowserDetails();
        const formData = {
            userId: "",
            branchCode: "",
            customerId: Boolean(existingCustomer) ? existingCustomer?.id : "",
            customerUserId: Boolean(existingCustomer) ? existingCustomer?.customerUserId : "",
            reason: reason,
            actionType: action,
            accountId: Boolean(account) ? account?.id : "",
            blockType: blockType,
            ip: ipAddress,
            browser: browser
        }
        try{
            const res = await customersApis.blockUnblockCustomer(authUser, formData)
            if (res.success){
                toast.success(res?.errorMessage ?? "Operation is successful!");
                handleOnClose();
                onClose?.();
            }
            else{
                toast.error(res?.errorMessage ?? "An error occurred! Try again Later")
            }
        }
        catch (e) {
            toast.error(e?.message ?? "An error occurred! Try again Later")
        }
        setIsLoading(false);
    }

    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    return (
        <>
            {type === "button" && (
                <MKButton
                    color={'primary'}
                    variant={'outlined'}
                    onClick={handleOnOpen}
                    disabled={disabled}
                >
                    {label}
                </MKButton>
            )}
            {type === "menu" && (
                <MenuItem
                    color={'primary'}
                    variant={'outlined'}
                    onClick={handleOnOpen}
                    disabled={disabled}
                >
                    {label}
                </MenuItem>
            )}
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogContent>
                    <form onSubmit={e => { e.preventDefault(); handleOnProceed()} }>
                        <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <MKTypography sx={{ mb: 2}} color={'primary'} variant={'h5'} align={'center'} gutterBottom>
                                {label}
                            </MKTypography>
                            {getMessage()}
                            <MKBox sx={{ width: '100%'}}>
                                <DMTTextInput
                                    multiline={true}
                                    minRows={3}
                                    fullWidth={true}
                                    required={true}
                                    value={reason}
                                    placeholder={'Write reason here...'}
                                    onChange={handleOnChange}
                                    label={'Reason'}
                                />
                            </MKBox>
                            <MKBox sx={{ display: 'flex', gap: 2, mt:2 }}>
                                <MKButton disabled={isLoading} onClick={handleOnClose} color={'error'} variant={'outlined'}>
                                    {"No, Dismiss"}
                                </MKButton>
                                <MKButton
                                    type={'submit'}
                                    disabled={isLoading}
                                    endIcon={isLoading && <LoaderIcon/>}
                                    variant={'contained'}
                                    color={'success'}
                                >
                                    {"Yes, Proceed"}
                                </MKButton>
                            </MKBox>
                        </MKBox>
                    </form>


                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default BlockUnblockUnlinkAccount;