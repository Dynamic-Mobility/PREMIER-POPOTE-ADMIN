import MKButton from "../../../../@mui-components/button";
import {useState} from "react";
import DevicesDrawer from "./devices-drawer";

const ManageDevices = props => {
    const {
        customer,
        existingCustomer
    } = props;

    const [openDialog, setOpenDialog] = useState(false);
    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <MKButton onClick={handleOnOpen} color={'primary'} variant={'outlined'}>
                {"Manage Devices"}
            </MKButton>
            <DevicesDrawer {...{
                open: openDialog, onClose: handleOnClose, customer, existingCustomer }}/>
        </>
    )
}

export default ManageDevices;