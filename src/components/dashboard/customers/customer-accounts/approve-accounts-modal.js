import DMTDialog from "../../../@dmt-components/dialog";
import {useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AccountsSelectionList from "./accounts-selection-list";
import MKButton from "../../../@mui-components/button";

const ApproveAccountsModal = props => {
    const { accounts, onRefresh } = props;
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnOpen = () => {
        setOpenDialog(true);
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }


    return (
        <>
            <MKButton
                size={"small"}
                variant={"outlined"}
                color={"primary"}
                onClick={handleOnOpen}
            >
                {"Approve Account(s)"}
            </MKButton>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogTitle>
                    {"Approve Account(s)"}
                </DialogTitle>
                <DialogContent>
                    <AccountsSelectionList accounts={accounts} onRefresh={onRefresh} onClose={handleOnClose}/>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default ApproveAccountsModal;