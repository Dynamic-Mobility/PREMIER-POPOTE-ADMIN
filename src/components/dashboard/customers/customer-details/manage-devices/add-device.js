
import React, {useState} from "react";

import ConfirmationDialog from "../../../../@dmt-components/confirmation-dialog";
import {useAuth} from "../../../../../hooks/use-auth";

import {toast} from "react-toastify";
import {customersApis} from "../../../../../api-requests/customers-api";
import MKButton from "../../../../@mui-components/button";

const AddDevice = props => {
    const { customer, onRefresh, device } = props;
    const authUser = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [dialogProps, setDialogProps] = useState({
        open: false,
        message: "",
        showReason: false,
        reject: false,
        onOk: null,
    });


    const handleCloseDialog = () => {
        // setIsLoading(false)
        setDialogProps({
            ...dialogProps,
            open: false,
        })
    }

    const handleOnAdd = () => {
        setDialogProps({
            open: true,
            message: `Are you sure you want to  add new device for ${customer?.firstName} ${customer?.lastName}?`,
            reject: false,
            showReason: false,
        })
    };

    const onAdd = async () => {
        setIsLoading(true);
        const formData = {
            customerId: customer?.id,
            customerUserId: customer?.customerUserId,
            newDeviceDetails: device
        }
        try{
            const res = await customersApis.addNewDevice(authUser, formData);
            if(res?.success){
                toast.success(res?.errorMessage ?? "Operation successful!");
                handleCloseDialog();
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
            <MKButton color={'success'} variant={'outlined'} sx={{ mt:4 }} size={'small'} onClick={handleOnAdd}>
                {"Add"}
            </MKButton>
            <ConfirmationDialog
                {...{
                    ...dialogProps,
                    onClose: handleCloseDialog,
                    isLoading: isLoading,
                    onOk: onAdd,
                }}
            />
        </>
    )
}

export default AddDevice;