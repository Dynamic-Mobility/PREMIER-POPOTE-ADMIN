import {Dialog, DialogContent} from "@mui/material";
import MKBox from "../@mui-components/box";
import {InfoOutlined} from "@mui/icons-material";
import MKTypography from "../@mui-components/typography";
import MKButton from "../@mui-components/button";
import {LoaderIcon} from "react-hot-toast";
import React, {useEffect, useState} from "react";
import Slide from "@mui/material/Slide";
import DMTTextInput from "./form/text-input";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const ConfirmationDialog = props => {
    const { open, onClose, onOk, isLoading, message= "Are you sure you want to proceed with this action?", showReason= false } = props;

    const [reason, setReason] = useState("");

    const handleOnOk = async () => {
        await onOk(reason)
    }

    const handleOnReason = e => {
        setReason(e.target.value);
    }

    useEffect(() => {
        setReason("")
    },[open])


    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                scroll={'body'}
                maxWidth={'sm'}
                fullWidth
                TransitionComponent={Transition}
            >
                <DialogContent>
                    <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <InfoOutlined fontSize={'large'} color={'warning'}/>
                        <MKTypography variant={'h5'} color={'warning'} gutterBottom>
                            {"Confirmation"}
                        </MKTypography>
                        <MKTypography gutterBottom>
                            {message}
                        </MKTypography>
                        {showReason && (
                            <>
                                <DMTTextInput
                                    fullWidth={true}
                                    name={'reason'}
                                    required={true}
                                    value={reason}
                                    onChange={handleOnReason}
                                    multiline={true}
                                    minRows={4}
                                    placeholder={'Type reason here...'}
                                />
                            </>
                        )}

                        <MKBox sx={{ display: 'flex', gap:2, mt: 2}}>
                            <MKButton
                                disabled={isLoading}
                                variant={'contained'}
                                color={'error'}
                                onClick={onClose}>
                                {"Cancel"}
                            </MKButton>
                            <MKButton
                                startIcon={isLoading && <LoaderIcon/>}
                                disabled={isLoading}
                                variant={'contained'}
                                color={'success'}
                                onClick={handleOnOk}>
                                {"Yes, Proceed"}
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ConfirmationDialog;