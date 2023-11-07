import React, {useState} from "react";
import DMTDialog from "../../@dmt-components/dialog";
import {DialogContent, DialogTitle} from "@mui/material";
import UsersForm from "./users-form";
import MKButton from "../../@mui-components/button";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";

const CreateUserDialog = props => {
    const [openDialog, setOpenDialog] = useState(false);
    const { onRefresh, branch, onClose } = props;
    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
        onClose?.();
    }

    return(
        <>
            {Boolean(branch) ? (
                <MenuItem onClick={handleOnOpen}>
                    <EditIcon sx={{mr: 1}} />
                    {" "}
                    {" Edit"}
                </MenuItem>
            ): (
                <MKButton onClick={handleOnOpen} variant={'contained'} color={'primary'}>
                    {"Create Branch"}
                </MKButton>
            )}

            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogTitle>
                    {Boolean(branch) ?"Update Branch" : "Create Branch"}
                </DialogTitle>
                <DialogContent>
                    <UsersForm branch={branch} onClose={handleOnClose} onRefresh={onRefresh}/>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default CreateUserDialog;