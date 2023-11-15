import {useState} from "react";
import DMTDialog from "../../../@dmt-components/dialog";
import {DialogContent} from "@mui/material";
import PersonalizedLimits from "../../limits/personalized-limits";
import MKButton from "../../../@mui-components/button";

const CustomerSetLimits = props => {
    const { customer , accounts } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const handleOnOpen = () => {
        setOpenDialog(true);
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <MKButton onClick={handleOnOpen} variant={"outlined"} color={"primary"}>
                {"Update Limits"}
            </MKButton>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
                maxWidth={'lg'}
                scroll={'paper'}
            >
                <DialogContent>
                    <PersonalizedLimits customer={customer} onClose={handleOnClose}/>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default CustomerSetLimits;