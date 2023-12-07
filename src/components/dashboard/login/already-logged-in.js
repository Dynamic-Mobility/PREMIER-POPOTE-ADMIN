import {DialogContent} from "@mui/material";
import React from "react";
import DMTDialog from "../../@dmt-components/dialog";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import MKButton from "../../@mui-components/button";
import Warning from "@mui/icons-material/Warning";

const AlreadyLoggedIn = props => {
    const { openDialog, onClose, onOk } = props;

    return (
        <>
            <DMTDialog
                open={openDialog}
            >
                <DialogContent>
                    <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <Warning color={'warning'} fontSize={'large'}/>
                        <MKTypography sx={{ mb: 2}} color={'primary'} variant={'h5'} align={'center'} gutterBottom>
                            {"New Login Alert!"}
                        </MKTypography>
                        <MKTypography align={'center'}>
                            {"You have an active session running on another device! If you proceed, you will be " +
                                "logged out from the other device"
                            }
                        </MKTypography>
                        <MKBox sx={{ mt:2}}>
                            <MKButton sx={{mr: 2}} variant={'outlined'} onClick={onClose}  color={'primary'}>
                                {"Dismiss"}
                            </MKButton>
                            <MKButton variant={'contained'} color={'success'} onClick={onOk}>
                                {"Proceed!"}
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default AlreadyLoggedIn;