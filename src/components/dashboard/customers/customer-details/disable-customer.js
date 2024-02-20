import {useState} from "react";
import MKButton from "../../../@mui-components/button";
import DMTDialog from "../../../@dmt-components/dialog";
import DialogContent from "@mui/material/DialogContent";
import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import * as React from "react";
import {LoaderIcon} from "react-hot-toast";
import {customersApis} from "../../../../api-requests/customers-api";
import {useAuth} from "../../../../hooks/use-auth";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import {toast} from "react-toastify";
import {getBrowserDetails, getIPAddress} from "../../../../utils/helper-functions";

const DisableCustomerButton = props => {
    const { existingCustomer, disabled = false, customer, onRefresh } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [reason, setReason] = useState("");
    const authUser = useAuth();


    const action= "Disable Customer";

    const handleOnChange = e => {
        setReason(e.target.value);
    }

    const handleOnProceed = async () => {
        const ipAddress = await getIPAddress();
        const browser = getBrowserDetails();
        const formData = {
            userId: authUser.user?.userid,
            customerId: existingCustomer?.id,
            customerUserId: existingCustomer?.customerUserId,
            reason: reason,
            ip: ipAddress,
            browser: browser
        }
        setIsLoading(true)
        try{
            const res = await customersApis.disableCustomer(authUser, formData)
            if (res.success){
                toast.success(res?.errorMessage ?? "Operation is successful!");
                handleOnClose();
                onRefresh?.();
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
            <MKButton
                sx={{ mt: 2 }}
                color={'error'}
                variant={'contained'}
                onClick={handleOnOpen}
                disabled={disabled}
                fullWidth={true}
            >
                {action}
            </MKButton>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogContent>
                    <form onSubmit={e => { e.preventDefault(); handleOnProceed()} }>
                        <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <MKTypography sx={{ mb: 2}} color={'primary'} variant={'h5'} align={'center'} gutterBottom>
                                {action}
                            </MKTypography>
                            <MKTypography align={'center'} gutterBottom>
                                {`Are you sure you want to ${action.toLowerCase()} - `}
                                <b>{existingCustomer?.name} ?</b>
                            </MKTypography>
                            <MKBox sx={{ width: '100%'}}>
                                <DMTTextInput
                                    multiline={true}
                                    minRows={3}
                                    fullWidth={true}
                                    required={true}
                                    // error={Boolean(!reason)}
                                    // helperText={Boolean(!reason) && "Reason is required!"}
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

export default DisableCustomerButton;