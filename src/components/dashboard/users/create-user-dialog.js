import React, {useState} from "react";
import DMTDialog from "../../@dmt-components/dialog";
import {DialogContent, DialogTitle} from "@mui/material";
import UsersForm from "./users-form";
import MKButton from "../../@mui-components/button";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";

const CreateUserDialog = props => {
    const [openDialog, setOpenDialog] = useState(false);
    const { onRefresh, user, onClose } = props;
    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
        onClose?.();
    }

    return(
        <>
            {Boolean(user) ? (
                <MenuItem onClick={handleOnOpen}>
                    <EditIcon sx={{mr: 1}} />
                    {" "}
                    {" Edit User"}
                </MenuItem>
            ): (
                <MKButton onClick={handleOnOpen} variant={'contained'} color={'primary'}>
                    {"Create User"}
                </MKButton>
            )}

            <DMTDialog
                open={openDialog}
                //onClose={handleOnClose}
            >
                <DialogTitle>
                    {Boolean(user) ?"Update User" : "Create User"}
                </DialogTitle>
                <DialogContent>
                    <UsersForm user={user} onClose={handleOnClose} onRefresh={onRefresh}/>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default CreateUserDialog;